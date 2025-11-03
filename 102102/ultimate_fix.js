// 🚀 终极挑战系统修复 - 完全重写核心函数
console.log('🔄 开始终极挑战系统修复...');

// ✅ 确保挑战数据存在
if (!window.dailyChallenges) {
    console.log('❌ dailyChallenges未初始化，正在创建...');
    window.dailyChallenges = [
        {
            id: 'click_100',
            title: '摸鱼新手',
            description: '点击金币达到100次',
            icon: '🎯',
            target: 100,
            reward: 500,
            type: 'click',
            progress: 0,
            completed: false,
            claimed: false
        },
        {
            id: 'time_30min',
            title: '时间管理大师',
            description: '累计摸鱼30分钟',
            icon: '⏰',
            target: 30 * 60 * 1000,
            reward: 1000,
            type: 'time',
            progress: 0,
            completed: false,
            claimed: false
        },
        {
            id: 'accuracy_80',
            title: '精准点击',
            description: '成功点击金币80次',
            icon: '🎯',
            target: 80,
            reward: 800,
            type: 'accuracy',
            progress: 0,
            completed: false,
            claimed: false
        }
    ];
    localStorage.setItem('dailyChallenges', JSON.stringify(window.dailyChallenges));
}

// ✅ 重写核心更新函数
window.updateChallengeProgress = function(type, value = 1) {
    console.log('🔄 [终极修复] 更新挑战进度 - 类型:', type, '值:', value);
    console.log('📊 当前挑战状态:', window.dailyChallenges.map(c => ({
        title: c.title,
        progress: c.progress,
        target: c.target,
        completed: c.completed
    })));
    
    let updated = false;
    let completedChallenge = null;
    
    if (window.dailyChallenges && Array.isArray(window.dailyChallenges)) {
        window.dailyChallenges.forEach(challenge => {
            if (challenge.type === type && !challenge.completed) {
                console.log('🎯 找到匹配挑战:', challenge.title, '当前进度:', challenge.progress);
                
                // 更新进度
                if (type === 'click') {
                    challenge.progress += value;
                    console.log('🖱️ 点击挑战进度更新:', challenge.progress, '/', challenge.target);
                } else if (type === 'time') {
                    challenge.progress = Math.min(challenge.progress + value, challenge.target);
                    console.log('⏰ 时间挑战进度更新:', challenge.progress, '/', challenge.target);
                } else if (type === 'accuracy') {
                    challenge.progress += value;
                    console.log('🎯 精准挑战进度更新:', challenge.progress, '/', challenge.target);
                }
                
                // 检查是否完成
                if (challenge.progress >= challenge.target) {
                    challenge.completed = true;
                    completedChallenge = challenge;
                    console.log('🎉 挑战完成:', challenge.title);
                }
                
                updated = true;
            }
        });
        
        if (updated) {
            console.log('💾 保存挑战进度到本地存储');
            localStorage.setItem('dailyChallenges', JSON.stringify(window.dailyChallenges));
            
            // ✅ 立即更新所有显示元素
            updateAllChallengeDisplays();
            
            // 更新统计面板
            if (typeof updateDisplay === 'function') {
                updateDisplay();
            }
            
            // 播放完成音效和通知
            if (completedChallenge) {
                setTimeout(() => {
                    if (typeof playAchievementSound === 'function') {
                        playAchievementSound();
                    }
                    if (typeof showNotification === 'function') {
                        showNotification(`🎉 挑战完成: ${completedChallenge.title}! +${completedChallenge.reward}金币`, 'achievement');
                    }
                    console.log('🏆 挑战完成通知已发送:', completedChallenge.title);
                }, 500);
            }
        }
    }
    
    return updated;
};

// ✅ 创建全新的显示更新函数
window.updateAllChallengeDisplays = function() {
    console.log('🔄 [终极修复] 更新所有挑战显示元素...');
    
    if (!window.dailyChallenges || !Array.isArray(window.dailyChallenges)) {
        console.log('❌ dailyChallenges数据无效');
        return;
    }
    
    window.dailyChallenges.forEach((challenge, index) => {
        const challengeNum = index + 1;
        
        // 更新硬编码元素
        const progressText = document.getElementById(`progressText${challengeNum}`);
        const progressBar = document.getElementById(`progress${challengeNum}`);
        const claimBtn = document.getElementById(`claim${challengeNum}`);
        
        if (progressText) {
            const displayText = challenge.type === 'time' 
                ? `${Math.floor(challenge.progress / 60000)}/${Math.floor(challenge.target / 60000)}分钟`
                : `${challenge.progress}/${challenge.target}`;
            progressText.textContent = displayText;
            console.log(`📝 挑战${challengeNum}文本更新:`, displayText);
        }
        
        if (progressBar) {
            const percentage = Math.min((challenge.progress / challenge.target) * 100, 100);
            progressBar.style.width = `${percentage}%`;
            console.log(`📊 挑战${challengeNum}进度条:`, `${percentage}%`);
        }
        
        if (claimBtn) {
            if (challenge.completed && !challenge.claimed) {
                claimBtn.disabled = false;
                claimBtn.classList.add('available');
                claimBtn.textContent = '领取';
                console.log(`🎁 挑战${challengeNum}可领取奖励`);
            } else if (challenge.claimed) {
                claimBtn.disabled = true;
                claimBtn.classList.add('claimed');
                claimBtn.textContent = '已领取';
                console.log(`✅ 挑战${challengeNum}已领取`);
            } else {
                claimBtn.disabled = true;
                claimBtn.textContent = '领取';
            }
        }
    });
    
    console.log('✅ [终极修复] 所有挑战显示元素更新完成');
};

// ✅ 重写原有的updateChallengeDisplay函数
window.updateChallengeDisplay = function() {
    console.log('🔄 [终极修复] updateChallengeDisplay被调用');
    updateAllChallengeDisplays();
};

// ✅ 修复金币点击事件
window.fixCoinClickEvents = function() {
    console.log('🔄 [终极修复] 修复金币点击事件...');
    
    // 获取金币画布
    const canvas = document.getElementById('coinCanvas');
    if (!canvas) {
        console.log('❌ 找不到coinCanvas元素');
        return;
    }
    
    // 移除旧的点击事件监听器
    const newCanvas = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(newCanvas, canvas);
    
    // 添加新的点击事件监听器
    newCanvas.addEventListener('click', function(e) {
        console.log('🖱️ [终极修复] 检测到画布点击事件');
        
        const rect = newCanvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        console.log('点击坐标:', clickX, clickY);
        
        // 检查是否点击到金币
        let coinClicked = false;
        if (window.coins && Array.isArray(window.coins)) {
            window.coins.forEach((coin, index) => {
                const distance = Math.sqrt(Math.pow(clickX - coin.x, 2) + Math.pow(clickY - coin.y, 2));
                if (distance < coin.size) {
                    console.log('💰 点击到金币:', index);
                    coinClicked = true;
                    
                    // 更新挑战进度
                    updateChallengeProgress('click', 1);
                    updateChallengeProgress('accuracy', 1);
                    
                    // 移除被点击的金币
                    window.coins.splice(index, 1);
                    
                    // 增加分数
                    if (typeof updateScore === 'function') {
                        updateScore(10);
                    }
                }
            });
        }
        
        if (!coinClicked) {
            console.log('❌ 未点击到金币');
        }
    });
    
    console.log('✅ [终极修复] 金币点击事件修复完成');
};

// ✅ 创建测试函数
window.testChallengeSystem = function() {
    console.log('🧪 [终极修复] 开始测试挑战系统...');
    
    // 测试挑战1：点击
    console.log('🧪 测试挑战1：点击挑战');
    const initialClickProgress = window.dailyChallenges[0].progress;
    updateChallengeProgress('click', 5);
    
    setTimeout(() => {
        console.log('🧪 测试挑战3：精准挑战');
        updateChallengeProgress('accuracy', 3);
        
        setTimeout(() => {
            console.log('📊 测试完成，当前状态:');
            window.dailyChallenges.forEach((c, i) => {
                console.log(`挑战${i+1}: ${c.title} - ${c.progress}/${c.target} (完成: ${c.completed})`);
            });
        }, 1000);
    }, 1000);
};

// ✅ 创建状态检查函数
window.checkChallengeStatus = function() {
    console.log('📊 [终极修复] 挑战系统状态检查:');
    console.log('dailyChallenges存在:', !!window.dailyChallenges);
    console.log('updateChallengeProgress函数:', typeof window.updateChallengeProgress);
    console.log('updateAllChallengeDisplays函数:', typeof window.updateAllChallengeDisplays);
    
    if (window.dailyChallenges) {
        console.log('挑战详情:');
        window.dailyChallenges.forEach((c, i) => {
            console.log(`${i+1}. ${c.title}: ${c.progress}/${c.target} (${c.completed ? '已完成' : '进行中'})`);
        });
    }
};

// ✅ 立即执行修复
setTimeout(() => {
    console.log('🚀 [终极修复] 开始执行修复流程...');
    
    // 1. 修复挑战数据
    if (!window.dailyChallenges) {
        console.log('🔄 初始化挑战数据...');
        window.dailyChallenges = [
            {
                id: 'click_100',
                title: '摸鱼新手',
                description: '点击金币达到100次',
                icon: '🎯',
                target: 100,
                reward: 500,
                type: 'click',
                progress: 0,
                completed: false,
                claimed: false
            },
            {
                id: 'time_30min',
                title: '时间管理大师',
                description: '累计摸鱼30分钟',
                icon: '⏰',
                target: 30 * 60 * 1000,
                reward: 1000,
                type: 'time',
                progress: 0,
                completed: false,
                claimed: false
            },
            {
                id: 'accuracy_80',
                title: '精准点击',
                description: '成功点击金币80次',
                icon: '🎯',
                target: 80,
                reward: 800,
                type: 'accuracy',
                progress: 0,
                completed: false,
                claimed: false
            }
        ];
    }
    
    // 2. 修复金币点击事件
    fixCoinClickEvents();
    
    // 3. 更新显示
    updateAllChallengeDisplays();
    
    console.log('🎉 [终极修复] 修复完成！');
    console.log('💡 使用方法:');
    console.log('   - 点击金币测试挑战1和3');
    console.log('   - 使用 testChallengeSystem() 进行测试');
    console.log('   - 使用 checkChallengeStatus() 查看状态');
    
}, 1000);

console.log('✅ 终极修复脚本已加载，1秒后开始执行修复...');