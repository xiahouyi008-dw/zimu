// 诊断挑战系统问题
console.log('=== 挑战系统诊断开始 ===');

// 检查本地存储中的挑战数据
const savedChallenges = localStorage.getItem('dailyChallenges');
const lastUpdate = localStorage.getItem('dailyChallengesLastUpdate');

console.log('1. 本地存储挑战数据:', savedChallenges);
console.log('2. 最后更新时间:', lastUpdate);
console.log('3. 当前时间:', new Date().toISOString());

if (savedChallenges) {
    try {
        const challenges = JSON.parse(savedChallenges);
        console.log('4. 解析后的挑战数据:', challenges);
        
        // 查找点击挑战
        const clickChallenge = challenges.find(c => c.type === 'click');
        if (clickChallenge) {
            console.log('5. 点击挑战详情:');
            console.log('   - ID:', clickChallenge.id);
            console.log('   - 标题:', clickChallenge.title);
            console.log('   - 进度:', clickChallenge.progress);
            console.log('   - 目标:', clickChallenge.target);
            console.log('   - 完成状态:', clickChallenge.completed);
            console.log('   - 领取状态:', clickChallenge.claimed);
        } else {
            console.log('5. 未找到点击挑战');
        }
    } catch (e) {
        console.error('解析挑战数据失败:', e);
    }
} else {
    console.log('4. 没有找到保存的挑战数据');
}

// 检查游戏统计
const gameStats = localStorage.getItem('gameStats');
if (gameStats) {
    try {
        const stats = JSON.parse(gameStats);
        console.log('6. 游戏统计:', stats);
        console.log('7. 总点击数:', stats.totalClicks);
    } catch (e) {
        console.error('解析游戏统计失败:', e);
    }
}

// 检查挑战显示元素
console.log('8. DOM元素检查:');
const challengeElements = document.querySelectorAll('[id*="challenge"], [class*="challenge"]');
challengeElements.forEach((el, index) => {
    console.log(`   挑战元素 ${index}:`, {
        tag: el.tagName,
        id: el.id,
        className: el.className,
        textContent: el.textContent.substring(0, 50) + '...'
    });
});

// 检查挑战面板是否可见
const challengePanel = document.getElementById('dailyChallengesPanel');
if (challengePanel) {
    console.log('9. 挑战面板状态:');
    console.log('   - 显示状态:', challengePanel.style.display);
    console.log('   - 可见性:', challengePanel.offsetParent ? '可见' : '隐藏');
} else {
    console.log('9. 未找到挑战面板元素');
}

console.log('=== 挑战系统诊断结束 ===');