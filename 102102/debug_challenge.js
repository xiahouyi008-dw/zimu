// 调试挑战系统
console.log('=== 挑战系统调试开始 ===');

// 重写console.log来捕获所有日志
const originalLog = console.log;
const logs = [];
console.log = function(...args) {
    logs.push(args.join(' '));
    originalLog.apply(console, args);
};

// 检查关键函数是否存在
console.log('1. 检查关键函数:');
console.log('   - updateChallengeProgress 存在:', typeof updateChallengeProgress === 'function');
console.log('   - initDailyChallenges 存在:', typeof initDailyChallenges === 'function');
console.log('   - updateChallengeDisplay 存在:', typeof updateChallengeDisplay === 'function');

// 检查挑战数据
console.log('\n2. 挑战数据状态:');
console.log('   - dailyChallenges 数组:', dailyChallenges);
console.log('   - dailyChallenges 长度:', dailyChallenges ? dailyChallenges.length : '未定义');

// 检查点击计数
console.log('\n3. 点击计数状态:');
console.log('   - totalClicks:', typeof totalClicks !== 'undefined' ? totalClicks : '未定义');

// 手动测试挑战更新
console.log('\n4. 手动测试挑战更新:');
if (typeof updateChallengeProgress === 'function') {
    console.log('   调用 updateChallengeProgress("click", 1)...');
    try {
        updateChallengeProgress('click', 1);
        console.log('   ✓ 调用成功');
    } catch (e) {
        console.log('   ✗ 调用失败:', e.message);
    }
} else {
    console.log('   ✗ updateChallengeProgress 函数未定义');
}

// 检查挑战显示
console.log('\n5. 挑战显示检查:');
const challengeElements = document.querySelectorAll('[id*="challenge"], [class*="challenge"]');
console.log('   找到的挑战相关元素数量:', challengeElements.length);

// 检查具体的挑战元素
const clickChallengeElement = document.querySelector('#challenge-click_100, .challenge-click_100, [data-challenge-id="click_100"]');
console.log('   点击挑战元素存在:', !!clickChallengeElement);
if (clickChallengeElement) {
    console.log('   点击挑战元素内容:', clickChallengeElement.textContent.substring(0, 100));
}

// 显示所有捕获的日志
setTimeout(() => {
    console.log('\n=== 捕获的日志 ===');
    logs.forEach((log, index) => {
        console.log(`${index + 1}. ${log}`);
    });
    
    console.log('\n=== 挑战系统调试结束 ===');
    
    // 恢复原始console.log
    console.log = originalLog;
}, 1000);