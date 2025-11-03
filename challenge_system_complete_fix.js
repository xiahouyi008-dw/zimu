// 挑战系统完整修复脚本
// 解决挑战1 - 摸鱼新手 点击金币数量不更新的问题

(function() {
    'use strict';
    
    console.log('🛠️ 挑战系统修复脚本加载中...');
    
    // 等待游戏完全加载
    function waitForGameLoad() {
        if (typeof gameStats === 'undefined' || typeof dailyChallenges === 'undefined') {
            console.log('⏳ 等待游戏数据加载...');
            setTimeout(waitForGameLoad, 1000);
            return;
        }
        
        console.log('✅ 游戏数据已加载，开始修复挑战系统');
        fixChallengeSystem();
    }
    
    function fixChallengeSystem() {
        try {
            // 1. 重写 updateChallengeProgress 函数
            const originalUpdateChallengeProgress = window.updateChallengeProgress;
            
            window.updateChallengeProgress = function(type, amount) {
                console.log(`📊 更新挑战进度: ${type} +${amount}`);
                
                // 调用原始函数保持原有逻辑
                if (originalUpdateChallengeProgress) {
                    originalUpdateChallengeProgress.call(this, type, amount);
                }
                
                // 新增：更新硬编码的挑战显示
                updateChallengeDisplayLegacy();
                
                // 保存到本地存储
                saveDailyChallenges();
                
                console.log('✅ 挑战进度更新完成');
            };
            
            // 2. 新增更新硬编码挑战显示的函数
            function updateChallengeDisplayLegacy() {
                console.log('🔄 更新挑战显示元素...');
                
                // 获取挑战数据
                const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
                if (!challenge1) {
                    console.warn('❌ 未找到挑战1数据');
                    return;
                }
                
                // 更新挑战1 - 摸鱼新手
                const challenge1Element = document.getElementById('challenge1');
                const progress1 = document.getElementById('progress1');
                const progressText1 = document.getElementById('progressText1');
                const claimBtn1 = document.getElementById('claimBtn1');
                
                if (challenge1Element && progress1 && progressText1) {
                    const progress = Math.min(challenge1.progress, challenge1.target);
                    const percentage = (progress / challenge1.target) * 100;
                    
                    // 更新进度条
                    progress1.style.width = percentage + '%';
                    
                    // 更新进度文本
                    progressText1.textContent = `${progress}/${challenge1.target}`;
                    
                    // 更新完成状态
                    if (challenge1.completed) {
                        challenge1Element.classList.add('completed');
                        if (claimBtn1) {
                            claimBtn1.disabled = false;
                            claimBtn1.textContent = '领取奖励';
                        }
                    } else {
                        challenge1Element.classList.remove('completed');
                        if (claimBtn1) {
                            claimBtn1.disabled = true;
                            claimBtn1.textContent = '未完成';
                        }
                    }
                    
                    console.log(`✅ 挑战1已更新: ${progress}/${challenge1.target} (${percentage.toFixed(1)}%)`);
                } else {
                    console.warn('❌ 挑战1的DOM元素未找到');
                }
                
                // 更新挑战2 - 准确率大师
                const challenge2 = dailyChallenges.find(c => c.id === 'accuracy_80');
                if (challenge2) {
                    const challenge2Element = document.getElementById('challenge2');
                    const progress2 = document.getElementById('progress2');
                    const progressText2 = document.getElementById('progressText2');
                    const claimBtn2 = document.getElementById('claimBtn2');
                    
                    if (challenge2Element && progress2 && progressText2) {
                        const percentage = challenge2.accuracy || 0;
                        progress2.style.width = percentage + '%';
                        progressText2.textContent = `${percentage.toFixed(1)}%`;
                        
                        if (challenge2.completed) {
                            challenge2Element.classList.add('completed');
                            if (claimBtn2) {
                                claimBtn2.disabled = false;
                                claimBtn2.textContent = '领取奖励';
                            }
                        } else {
                            challenge2Element.classList.remove('completed');
                            if (claimBtn2) {
                                claimBtn2.disabled = true;
                                claimBtn2.textContent = '未完成';
                            }
                        }
                    }
                }
                
                // 更新挑战3 - 连击高手
                const challenge3 = dailyChallenges.find(c => c.id === 'combo_50');
                if (challenge3) {
                    const challenge3Element = document.getElementById('challenge3');
                    const progress3 = document.getElementById('progress3');
                    const progressText3 = document.getElementById('progressText3');
                    const claimBtn3 = document.getElementById('claimBtn3');
                    
                    if (challenge3Element && progress3 && progressText3) {
                        const progress = Math.min(challenge3.progress, challenge3.target);
                        const percentage = (progress / challenge3.target) * 100;
                        
                        progress3.style.width = percentage + '%';
                        progressText3.textContent = `${progress}/${challenge3.target}`;
                        
                        if (challenge3.completed) {
                            challenge3Element.classList.add('completed');
                            if (claimBtn3) {
                                claimBtn3.disabled = false;
                                claimBtn3.textContent = '领取奖励';
                            }
                        } else {
                            challenge3Element.classList.remove('completed');
                            if (claimBtn3) {
                                claimBtn3.disabled = true;
                                claimBtn3.textContent = '未完成';
                            }
                        }
                    }
                }
            }
            
            // 3. 修复领取奖励函数
            function fixClaimRewards() {
                const buttons = [
                    { id: 'claimBtn1', challengeId: 'click_100', reward: 500 },
                    { id: 'claimBtn2', challengeId: 'accuracy_80', reward: 800 },
                    { id: 'claimBtn3', challengeId: 'combo_50', reward: 1000 }
                ];
                
                buttons.forEach(btnInfo => {
                    const btn = document.getElementById(btnInfo.id);
                    if (btn) {
                        btn.addEventListener('click', function() {
                            const challenge = dailyChallenges.find(c => c.id === btnInfo.challengeId);
                            if (challenge && challenge.completed && !challenge.claimed) {
                                // 发放奖励
                                if (typeof gameStats !== 'undefined') {
                                    gameStats.coins += btnInfo.reward;
                                    if (typeof saveGameStats === 'function') {
                                        saveGameStats();
                                    }
                                }
                                
                                // 标记为已领取
                                challenge.claimed = true;
                                saveDailyChallenges();
                                
                                // 更新按钮状态
                                this.textContent = '已领取';
                                this.disabled = true;
                                
                                // 显示通知
                                if (typeof showNotification === 'function') {
                                    showNotification(`获得 ${btnInfo.reward} 金币！`, 'success');
                                }
                                
                                console.log(`🎉 领取奖励: ${btnInfo.reward} 金币`);
                            }
                        });
                    }
                });
            }
            
            // 4. 初始化修复
            function initializeFix() {
                console.log('🚀 初始化挑战系统修复...');
                
                // 立即更新一次显示
                updateChallengeDisplayLegacy();
                
                // 修复奖励按钮
                fixClaimRewards();
                
                // 添加定期更新（每5秒）
                setInterval(updateChallengeDisplayLegacy, 5000);
                
                console.log('✅ 挑战系统修复完成！');
                console.log('💡 现在点击金币应该能看到挑战1的进度更新了');
            }
            
            // 保存挑战数据到本地存储
            function saveDailyChallenges() {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
                    localStorage.setItem('challengeLastReset', new Date().toDateString());
                }
            }
            
            // 启动修复
            initializeFix();
            
            // 添加全局测试函数
            window.testChallengeSystem = function() {
                console.log('🧪 测试挑战系统...');
                console.log('当前挑战数据:', dailyChallenges);
                console.log('游戏统计:', gameStats);
                updateChallengeDisplayLegacy();
                console.log('✅ 测试完成');
            };
            
            console.log('🎉 挑战系统修复脚本加载完成！');
            console.log('💡 在控制台输入 testChallengeSystem() 可以测试挑战系统');
            
        } catch (error) {
            console.error('❌ 挑战系统修复失败:', error);
        }
    }
    
    // 启动修复
    waitForGameLoad();
    
})();