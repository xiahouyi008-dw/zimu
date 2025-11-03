// 修复点击问题的诊断和修复脚本
(function() {
    console.log('=== 开始诊断点击问题 ===');
    
    // 1. 检查boss-screen状态
    const bossScreen = document.getElementById('bossScreen');
    if (bossScreen) {
        console.log('bossScreen存在:');
        console.log('- display:', bossScreen.style.display);
        console.log('- classList:', bossScreen.classList.toString());
        console.log('- zIndex:', window.getComputedStyle(bossScreen).zIndex);
        console.log('- opacity:', window.getComputedStyle(bossScreen).opacity);
    } else {
        console.log('bossScreen不存在');
    }
    
    // 2. 检查canvas状态
    const canvas = document.getElementById('coinCanvas');
    if (canvas) {
        console.log('\ncoinCanvas存在:');
        console.log('- zIndex:', window.getComputedStyle(canvas).zIndex);
        console.log('- pointerEvents:', window.getComputedStyle(canvas).pointerEvents);
        console.log('- display:', window.getComputedStyle(canvas).display);
        console.log('- position:', window.getComputedStyle(canvas).position);
    } else {
        console.log('\ncoinCanvas不存在');
    }
    
    // 3. 检查是否有高z-index元素遮挡
    const allElements = document.querySelectorAll('*');
    let highZIndexElements = [];
    
    allElements.forEach(el => {
        const zIndex = window.getComputedStyle(el).zIndex;
        const display = window.getComputedStyle(el).display;
        const opacity = window.getComputedStyle(el).opacity;
        const pointerEvents = window.getComputedStyle(el).pointerEvents;
        
        if (zIndex && parseInt(zIndex) > 5 && display !== 'none' && opacity > 0) {
            highZIndexElements.push({
                element: el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : ''),
                zIndex: zIndex,
                display: display,
                opacity: opacity,
                pointerEvents: pointerEvents
            });
        }
    });
    
    console.log('\n高z-index元素 (zIndex > 5):');
    highZIndexElements.forEach(el => {
        console.log(`- ${el.element}: zIndex=${el.zIndex}, display=${el.display}, opacity=${el.opacity}, pointerEvents=${el.pointerEvents}`);
    });
    
    // 4. 检查是否有全屏覆盖元素
    const overlayElements = [];
    allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const position = window.getComputedStyle(el).position;
        const display = window.getComputedStyle(el).display;
        const opacity = window.getComputedStyle(el).opacity;
        
        if ((position === 'fixed' || position === 'absolute') && 
            display !== 'none' && 
            opacity > 0 &&
            rect.width >= window.innerWidth * 0.9 && 
            rect.height >= window.innerHeight * 0.9) {
            overlayElements.push({
                element: el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : ''),
                position: position,
                rect: rect,
                opacity: opacity
            });
        }
    });
    
    console.log('\n可能的覆盖元素 (全屏90%以上):');
    overlayElements.forEach(el => {
        console.log(`- ${el.element}: position=${el.position}, width=${el.rect.width}, height=${el.rect.height}, opacity=${el.opacity}`);
    });
    
    // 5. 修复常见问题
    console.log('\n=== 开始修复 ===');
    
    // 如果boss-screen是active状态，尝试关闭它
    if (bossScreen && bossScreen.classList.contains('active')) {
        console.log('发现boss-screen是active状态，尝试关闭...');
        if (typeof toggleBossMode === 'function') {
            toggleBossMode();
        } else {
            // 手动关闭
            bossScreen.classList.remove('active');
            bossScreen.style.display = 'none';
        }
        console.log('boss-screen已关闭');
    }
    
    // 确保canvas可以接收事件
    if (canvas) {
        canvas.style.pointerEvents = 'auto';
        console.log('canvas pointerEvents已设置为auto');
    }
    
    // 移除可能的高z-index遮挡元素
    highZIndexElements.forEach(item => {
        if (item.element.includes('boss-screen') && item.zIndex > 1000) {
            const el = document.querySelector(item.element.split('.')[0] + (item.element.includes('#') ? '#' + item.element.split('#')[1].split('.')[0] : ''));
            if (el) {
                el.style.display = 'none';
                console.log(`已隐藏高z-index元素: ${item.element}`);
            }
        }
    });
    
    console.log('\n=== 修复完成 ===');
    console.log('请测试点击功能是否恢复');
})();