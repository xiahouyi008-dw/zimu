// 挑战1 - 摸鱼新手 专门修复脚本
// 解决点击100次挑战不更新的问题

console.log('🎯 开始修复挑战1 - 摸鱼新手...');

(function() {
    'use strict';
    
    // 等待游戏加载完成
    function waitForGameLoad() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (typeof dailyChallenges !== 'undefined' && 
                    typeof updateChallengeProgress === 'function' &&
                    document.getElementById('coinCanvas')) {
                    console.log('✅ 游戏加载完成');
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 500);
            
            // 最多等待10秒
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve();
            }, 10000);
        });
    }
    
    // 修复挑战1显示
    function fixChallenge1Display() {
        console.log('🔧 修复挑战1显示...');
        
        const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
        if (!challenge1) {
            console.log('❌ 未找到挑战1');
            return false;
        }
        
        // 更新进度文本
        const progressText1 = document.getElementById('progressText1');
        if (progressText1) {
            progressText1.textContent = `${challenge1.progress}/${challenge1.target}`;
            console.log(`✅ 更新progressText1: ${challenge1.progress}/${challenge1.target}`);
        } else {
            console.log('❌ progressText1元素不存在');
        }
        
        // 更新进度条
        const progress1 = document.getElementById('progress1');
        if (progress1) {
            const percentage = Math.min((challenge1.progress / challenge1.target) * 100, 100);
            progress1.style.width = `${percentage}%`;
            console.log(`✅ 更新progress1宽度: ${percentage}%`);
        } else {
            console.log('❌ progress1元素不存在');
        }
        
        // 更新领取按钮状态
        const claim1 = document.getElementById('claim1');
        if (claim1) {
            if (challenge1.completed && !challenge1.claimed) {
                claim1.disabled = false;
                claim1.classList.add('available');
                claim1.textContent = '领取';
                console.log('✅ 更新claim1按钮: 可领取');
            } else if (challenge1.claimed) {
                claim1.disabled = true;
                claim1.classList.add('claimed');
                claim1.textContent = '已领取';
                console.log('✅ 更新claim1按钮: 已领取');
            } else {
                claim1.disabled = true;
                claim1.textContent = '领取';
                console.log('✅ 更新claim1按钮: 未完成');
            }
        } else {
            console.log('❌ claim1元素不存在');
        }
        
        return true;
    }
    
    // 重写updateChallengeProgress函数
    function overrideUpdateChallengeProgress() {
        console.log('🔄 重写updateChallengeProgress函数...');
        
        const originalFunction = window.updateChallengeProgress;
        
        window.updateChallengeProgress = function(type, value = 1) {
            console.log(`🔄 updateChallengeProgress被调用 - 类型: ${type}, 值: ${value}`);
            
            let updated = false;
            let completedChallenge = null;
            
            // 先执行原始逻辑
            if (originalFunction) {
                try {
                    originalFunction.call(this, type, value);
                } catch (error) {
                    console.log('⚠️  原始函数执行出错:', error);
                }
            }
            
            // 手动更新挑战数据（确保数据正确）
            dailyChallenges.forEach(challenge => {
                if (challenge.type === type && !challenge.completed) {
                    console.log(`📊 处理挑战: ${challenge.title} (${challenge.id})`);
                    
                    if (type === 'click') {
                        challenge.progress += value;
                        console.log(`🖱️ 点击挑战进度: ${challenge.progress}/${challenge.target}`);
                    } else if (type === 'time') {
                        challenge.progress = Math.min(challenge.progress + value, challenge.target);
                        console.log(`⏰ 时间挑战进度: ${challenge.progress}/${challenge.target}`);
                    } else if (type === 'accuracy') {
                        challenge.progress += value;
                        console.log(`🎯 精准挑战进度: ${challenge.progress}/${challenge.target}`);
                    }
                    
                    if (challenge.progress >= challenge.target) {
                        challenge.completed = true;
                        completedChallenge = challenge;
                        console.log(`🎉 挑战完成: ${challenge.title}!`);
                        
                        // 显示完成通知
                        if (typeof showChallengeCompleteNotification === 'function') {
                            showChallengeCompleteNotification(challenge);
                        }
                    }
                    
                    updated = true;
                }
            });
            
            if (updated) {
                console.log('💾 保存挑战数据到localStorage');
                localStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
                
                // 立即更新显示
                console.log('🔄 立即更新挑战显示');
                fixChallenge1Display();
                
                // 更新其他挑战显示
                if (typeof updateChallengeDisplay === 'function') {
                    updateChallengeDisplay();
                }
                
                // 更新统计
                if (typeof updateDisplay === 'function') {
                    updateDisplay();
                }
                if (typeof updateStats === 'function') {
                    updateStats();
                }
            }
            
            return updated;
        };
        
        console.log('✅ updateChallengeProgress函数已重写');
    }
    
    // 修复点击事件
    function fixClickEvent() {
        console.log('🖱️ 修复点击事件...');
        
        const canvas = document.getElementById('coinCanvas');
        if (!canvas) {
            console.log('❌ 未找到canvas元素');
            return;
        }
        
        // 添加调试点击事件
        canvas.addEventListener('click', function(e) {
            console.log('🖱️ Canvas被点击:', e.clientX, e.clientY);
            console.log('totalClicks当前值:', totalClicks);
            
            // 模拟金币点击检测
            setTimeout(() => {
                console.log('totalClicks新值:', totalClicks);
                if (totalClicks > 0) {
                    console.log('✅ 点击计数正常');
                } else {
                    console.log('⚠️  点击计数未增加');
                }
            }, 100);
        });
        
        console.log('✅ 点击事件调试器已添加');
    }
    
    // 定期同步显示
    function startDisplaySync() {
        console.log('🔄 启动显示同步...');
        
        setInterval(() => {
            const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
            if (challenge1) {
                fixChallenge1Display();
            }
        }, 1000); // 每秒同步一次
        
        console.log('✅ 显示同步已启动');
    }
    
    // 测试挑战1功能
    function testChallenge1() {
        console.log('\n🧪 测试挑战1功能...');
        
        const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
        if (!challenge1) {
            console.log('❌ 未找到挑战1');
            return;
        }
        
        console.log(`当前进度: ${challenge1.progress}/${challenge1.target}`);
        console.log('执行: updateChallengeProgress("click", 1)...');
        
        const originalProgress = challenge1.progress;
        updateChallengeProgress('click', 1);
        
        setTimeout(() => {
            const newProgress = challenge1.progress;
            console.log(`新进度: ${newProgress}/${challenge1.target}`);
            
            if (newProgress > originalProgress) {
                console.log('✅ 挑战1更新成功！');
            } else {
                console.log('❌ 挑战1更新失败');
            }
        }, 500);
    }
    
    // 主修复函数
    async function mainFix() {
        console.log('🚀 开始挑战1修复流程...');
        
        await waitForGameLoad();
        
        console.log('\n📊 修复前状态:');
        const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
        if (challenge1) {
            console.log(`挑战1进度: ${challenge1.progress}/${challenge1.target}`);
        }
        
        // 执行修复
        overrideUpdateChallengeProgress();
        fixClickEvent();
        fixChallenge1Display();
        startDisplaySync();
        
        console.log('\n✅ 修复完成！');
        
        // 测试修复效果
        setTimeout(() => {
            console.log('\n🧪 测试修复效果...');
            testChallenge1();
        }, 2000);
        
        // 提供调试命令
        console.log('\n📋 可用调试命令:');
        console.log('  testChallenge1() - 测试挑战1');
        console.log('  fixChallenge1Display() - 手动修复显示');
        console.log('  dailyChallenges - 查看所有挑战数据');
        console.log('  totalClicks - 查看总点击数');
    }
    
    // 立即执行修复
    mainFix();
    
})();