// 挑战3 - 精准点击 专门修复脚本
// 解决奖励金额不匹配和显示不更新的问题

(function() {
    'use strict';
    
    console.log('🎯 挑战3 - 精准点击 修复脚本加载中...');
    
    // 等待游戏完全加载
    function waitForGameLoad() {
        if (typeof gameStats === 'undefined' || typeof dailyChallenges === 'undefined') {
            console.log('⏳ 等待游戏数据加载...');
            setTimeout(waitForGameLoad, 1000);
            return;
        }
        
        console.log('✅ 游戏数据已加载，开始修复挑战3');
        fixChallenge3();
    }
    
    function fixChallenge3() {
        try {
            // 1. 修复奖励金额显示
            fixRewardAmount();
            
            // 2. 修复显示更新
            fixDisplayUpdate();
            
            // 3. 添加专门的挑战3测试函数
            addChallenge3Test();
            
            console.log('✅ 挑战3修复完成！');
            
        } catch (error) {
            console.error('❌ 挑战3修复失败:', error);
        }
    }
    
    // 修复奖励金额显示
    function fixRewardAmount() {
        const rewardElement = document.querySelector('#challenge3 .reward-amount');
        if (rewardElement) {
            // 获取正确的奖励金额
            const challenge = dailyChallenges.find(c => c.id === 'accuracy_80');
            if (challenge) {
                rewardElement.textContent = `+${challenge.reward}金币`;
                console.log(`✅ 奖励金额已修复: ${challenge.reward}金币`);
            } else {
                console.warn('❌ 未找到挑战3配置，使用默认800金币');
                rewardElement.textContent = '+800金币';
            }
        } else {
            console.warn('❌ 未找到奖励金额元素');
        }
    }
    
    // 修复显示更新
    function fixDisplayUpdate() {
        // 重写 updateChallengeProgress 以包含挑战3更新
        const originalUpdateChallengeProgress = window.updateChallengeProgress;
        
        window.updateChallengeProgress = function(type, value) {
            console.log(`📊 更新挑战进度: ${type} +${value}`);
            
            // 调用原始函数
            if (originalUpdateChallengeProgress) {
                originalUpdateChallengeProgress.call(this, type, value);
            }
            
            // 额外更新挑战3显示
            if (type === 'accuracy') {
                updateChallenge3Display();
            }
            
            // 保存数据
            saveDailyChallenges();
        };
        
        console.log('✅ 挑战3显示更新已修复');
    }
    
    // 专门更新挑战3显示
    function updateChallenge3Display() {
        const challenge = dailyChallenges.find(c => c.id === 'accuracy_80');
        if (!challenge) {
            console.warn('❌ 未找到挑战3数据');
            return;
        }
        
        const challenge3Element = document.getElementById('challenge3');
        const progress3 = document.getElementById('progress3');
        const progressText3 = document.getElementById('progressText3');
        const claimBtn3 = document.getElementById('claim3');
        
        if (challenge3Element && progress3 && progressText3) {
            const progress = Math.min(challenge.progress, challenge.target);
            const percentage = (progress / challenge.target) * 100;
            
            // 更新进度条
            progress3.style.width = percentage + '%';
            
            // 更新进度文本
            progressText3.textContent = `${progress}/${challenge.target}`;
            
            // 更新完成状态
            if (challenge.completed) {
                challenge3Element.classList.add('completed');
                if (claimBtn3) {
                    claimBtn3.disabled = false;
                    claimBtn3.textContent = challenge.claimed ? '已领取' : '领取';
                    claimBtn3.className = challenge.claimed ? 'claim-btn claimed' : 'claim-btn available';
                }
            } else {
                challenge3Element.classList.remove('completed');
                if (claimBtn3) {
                    claimBtn3.disabled = true;
                    claimBtn3.textContent = '未完成';
                    claimBtn3.className = 'claim-btn';
                }
            }
            
            console.log(`✅ 挑战3已更新: ${progress}/${challenge.target} (${percentage.toFixed(1)}%)`);
        } else {
            console.warn('❌ 挑战3的DOM元素未找到');
        }
    }
    
    // 修复领取奖励按钮
    function fixClaimButton() {
        const claimBtn3 = document.getElementById('claim3');
        if (claimBtn3) {
            claimBtn3.addEventListener('click', function() {
                const challenge = dailyChallenges.find(c => c.id === 'accuracy_80');
                if (challenge && challenge.completed && !challenge.claimed) {
                    // 发放奖励
                    if (typeof money !== 'undefined') {
                        money += challenge.reward;
                        if (typeof updateStats === 'function') {
                            updateStats();
                        }
                        if (typeof showNotification === 'function') {
                            showNotification(`+${challenge.reward}金币奖励已领取!`, 'achievement');
                        }
                    }
                    
                    // 标记为已领取
                    challenge.claimed = true;
                    saveDailyChallenges();
                    
                    // 更新按钮状态
                    this.textContent = '已领取';
                    this.disabled = true;
                    this.className = 'claim-btn claimed';
                    
                    console.log(`🎉 挑战3奖励已领取: ${challenge.reward} 金币`);
                }
            });
            
            console.log('✅ 挑战3领取按钮已修复');
        }
    }
    
    // 保存挑战数据
    function saveDailyChallenges() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
        }
    }
    
    // 添加测试函数
    function addChallenge3Test() {
        window.testChallenge3 = function() {
            console.log('🧪 测试挑战3...');
            
            const challenge = dailyChallenges.find(c => c.id === 'accuracy_80');
            if (challenge) {
                console.log('挑战3当前状态:', {
                    progress: challenge.progress,
                    target: challenge.target,
                    completed: challenge.completed,
                    claimed: challenge.claimed,
                    reward: challenge.reward
                });
                
                // 更新显示
                updateChallenge3Display();
                
                // 模拟几次精准点击
                console.log('模拟5次精准点击...');
                for (let i = 0; i < 5; i++) {
                    updateChallengeProgress('accuracy', 1);
                }
                
                console.log('✅ 挑战3测试完成');
            } else {
                console.error('❌ 未找到挑战3');
            }
        };
        
        console.log('💡 在控制台输入 testChallenge3() 可以测试挑战3');
    }
    
    // 初始化修复
    function initializeFix() {
        console.log('🚀 初始化挑战3修复...');
        
        // 立即修复奖励金额
        fixRewardAmount();
        
        // 立即更新显示
        updateChallenge3Display();
        
        // 修复领取按钮
        fixClaimButton();
        
        // 定期更新（每3秒）
        setInterval(updateChallenge3Display, 3000);
        
        console.log('✅ 挑战3修复初始化完成！');
        console.log('💡 现在点击金币应该能看到挑战3的进度更新了');
    }
    
    // 启动修复
    initializeFix();
    
})();