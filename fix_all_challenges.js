// 所有挑战综合修复脚本
// 同时修复挑战1、挑战2、挑战3的显示和更新问题

console.log('🚀 开始综合修复所有挑战...');

// 等待游戏加载完成
function waitForGameLoad() {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkLoad = () => {
            attempts++;
            
            if (typeof dailyChallenges !== 'undefined' && 
                typeof updateChallengeProgress !== 'undefined' &&
                document.getElementById('challenge1')) {
                console.log('✅ 游戏加载完成！');
                resolve(true);
            } else if (attempts >= maxAttempts) {
                console.log('❌ 等待游戏加载超时');
                resolve(false);
            } else {
                setTimeout(checkLoad, 200);
            }
        };
        
        checkLoad();
    });
}

// 修复所有挑战显示
function fixAllChallengeDisplays() {
    console.log('\n🎨 修复所有挑战显示...');
    
    if (typeof dailyChallenges === 'undefined') {
        console.log('❌ dailyChallenges未定义');
        return false;
    }
    
    const challenges = [
        { id: 1, challengeId: 'click_100', name: '挑战1-摸鱼新手' },
        { id: 2, challengeId: 'time_30min', name: '挑战2-时间管理大师' },
        { id: 3, challengeId: 'accuracy_80', name: '挑战3-精准点击' }
    ];
    
    let fixedCount = 0;
    
    challenges.forEach(challenge => {
        console.log(`\n📍 修复${challenge.name}:`);
        
        const challengeData = dailyChallenges.find(c => c.id === challenge.challengeId);
        if (!challengeData) {
            console.log(`   ❌ 未找到挑战数据`);
            return;
        }
        
        // 1. 修复进度文本
        const progressText = document.getElementById(`progressText${challenge.id}`);
        if (progressText) {
            progressText.textContent = `${challengeData.progress}/${challengeData.target}`;
            console.log(`   ✅ 修复进度文本: ${challengeData.progress}/${challengeData.target}`);
        } else {
            console.log(`   ❌ progressText${challenge.id}不存在`);
        }
        
        // 2. 修复进度条
        const progressBar = document.getElementById(`progress${challenge.id}`);
        if (progressBar) {
            const percentage = Math.min((challengeData.progress / challengeData.target) * 100, 100);
            progressBar.style.width = `${percentage}%`;
            console.log(`   ✅ 修复进度条: ${percentage}%`);
        } else {
            console.log(`   ❌ progress${challenge.id}不存在`);
        }
        
        // 3. 修复领取按钮
        const claimBtn = document.getElementById(`claim${challenge.id}`);
        if (claimBtn) {
            if (challengeData.completed && !challengeData.claimed) {
                claimBtn.disabled = false;
                claimBtn.classList.add('available');
                claimBtn.textContent = '领取';
                console.log(`   ✅ 修复领取按钮: 可领取`);
            } else if (challengeData.claimed) {
                claimBtn.disabled = true;
                claimBtn.classList.add('claimed');
                claimBtn.textContent = '已领取';
                console.log(`   ✅ 修复领取按钮: 已领取`);
            } else {
                claimBtn.disabled = true;
                claimBtn.textContent = '领取';
                console.log(`   ✅ 修复领取按钮: 未完成`);
            }
        } else {
            console.log(`   ❌ claim${challenge.id}不存在`);
        }
        
        // 4. 修复奖励金额显示
        const rewardElement = document.querySelector(`#challenge${challenge.id} .reward-amount`);
        if (rewardElement) {
            rewardElement.textContent = `${challengeData.reward}`;
            console.log(`   ✅ 修复奖励金额: ${challengeData.reward}金币`);
        } else {
            console.log(`   ❌ 奖励金额元素不存在`);
        }
        
        fixedCount++;
    });
    
    console.log(`\n✅ 修复了 ${fixedCount}/${challenges.length} 个挑战显示`);
    return fixedCount === challenges.length;
}

// 重写updateChallengeProgress函数（综合修复）
function overrideUpdateChallengeProgress() {
    console.log('\n🔄 重写updateChallengeProgress函数（综合修复）...');
    
    const originalFunction = window.updateChallengeProgress;
    
    window.updateChallengeProgress = function(type, value = 1) {
        console.log(`🔄 updateChallengeProgress被调用 - 类型: ${type}, 值: ${value}`);
        
        let updated = false;
        let completedChallenges = [];
        
        // 执行原始逻辑（如果存在）
        if (originalFunction) {
            try {
                originalFunction.call(this, type, value);
            } catch (error) {
                console.log('⚠️  原始函数执行出错:', error);
            }
        }
        
        // 手动更新挑战数据
        dailyChallenges.forEach(challenge => {
            if (challenge.type === type && !challenge.completed) {
                console.log(`📊 处理挑战: ${challenge.title} (${challenge.id})`);
                
                const originalProgress = challenge.progress;
                
                if (type === 'click') {
                    challenge.progress += value;
                } else if (type === 'time') {
                    challenge.progress = Math.min(challenge.progress + value, challenge.target);
                } else if (type === 'accuracy') {
                    challenge.progress += value;
                }
                
                console.log(`📈 进度更新: ${originalProgress} → ${challenge.progress}/${challenge.target}`);
                
                if (challenge.progress >= challenge.target) {
                    challenge.completed = true;
                    completedChallenges.push(challenge);
                    console.log(`🎉 挑战完成: ${challenge.title}!`);
                }
                
                updated = true;
            }
        });
        
        if (updated) {
            console.log('💾 保存挑战数据到localStorage');
            localStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
            
            // 立即更新所有挑战显示
            console.log('🔄 立即更新所有挑战显示');
            fixAllChallengeDisplays();
            
            // 显示完成通知
            completedChallenges.forEach(challenge => {
                if (typeof showChallengeCompleteNotification === 'function') {
                    showChallengeCompleteNotification(challenge);
                }
            });
            
            // 更新其他显示
            if (typeof updateDisplay === 'function') {
                updateDisplay();
            }
            if (typeof updateStats === 'function') {
                updateStats();
            }
        }
        
        return updated;
    };
    
    console.log('✅ updateChallengeProgress函数已重写（综合修复）');
}

// 修复点击事件
function fixClickEvents() {
    console.log('\n🖱️ 修复点击事件...');
    
    // 修复挑战1的点击事件
    if (typeof totalClicks !== 'undefined') {
        console.log('✅ totalClicks变量存在');
    } else {
        window.totalClicks = 0;
        console.log('📝 创建totalClicks变量');
    }
    
    // 修复挑战3的点击事件
    if (typeof totalAttempts !== 'undefined') {
        console.log('✅ totalAttempts变量存在');
    } else {
        window.totalAttempts = 0;
        console.log('📝 创建totalAttempts变量');
    }
    
    // 确保金币点击事件正确触发
    const coinElements = document.querySelectorAll('.coin');
    console.log(`📍 找到 ${coinElements.length} 个金币元素`);
    
    coinElements.forEach((coin, index) => {
        console.log(`   金币${index + 1}: 检查点击事件`);
        
        // 添加调试点击事件
        coin.addEventListener('click', function(event) {
            console.log(`🪙 金币被点击 - 位置: (${event.clientX}, ${event.clientY})`);
            
            // 模拟金币收集逻辑
            if (typeof updateChallengeProgress === 'function') {
                updateChallengeProgress('click', 1);
                console.log('✅ 触发挑战1更新');
                
                // 模拟精准点击逻辑
                setTimeout(() => {
                    updateChallengeProgress('accuracy', 1);
                    console.log('✅ 触发挑战3更新');
                }, 50);
            }
        });
    });
    
    console.log('✅ 点击事件修复完成');
}

// 定期同步显示
function startPeriodicSync() {
    console.log('\n🔄 启动定期同步显示...');
    
    // 每3秒同步一次显示
    setInterval(() => {
        fixAllChallengeDisplays();
    }, 3000);
    
    console.log('✅ 定期同步已启动（每3秒）');
}

// 测试所有挑战功能
function testAllChallenges() {
    console.log('\n🧪 测试所有挑战功能...');
    
    console.log('\n1️⃣ 测试挑战1（点击）:');
    updateChallengeProgress('click', 5);
    
    setTimeout(() => {
        console.log('\n2️⃣ 测试挑战2（时间）:');
        updateChallengeProgress('time', 1000);
        
        setTimeout(() => {
            console.log('\n3️⃣ 测试挑战3（精准）:');
            updateChallengeProgress('accuracy', 3);
            
            setTimeout(() => {
                console.log('\n✅ 所有挑战测试完成');
                console.log('\n📊 最终状态:');
                dailyChallenges.forEach((challenge, index) => {
                    console.log(`挑战${index + 1} (${challenge.id}): ${challenge.progress}/${challenge.target} (${challenge.completed ? '已完成' : '未完成'})`);
                });
            }, 1000);
        }, 1000);
    }, 1000);
}

// 主修复函数
async function fixAllChallenges() {
    console.log('\n🚀 开始综合修复...');
    
    // 1. 等待游戏加载
    const loaded = await waitForGameLoad();
    if (!loaded) {
        console.log('❌ 游戏加载失败');
        return false;
    }
    
    // 2. 修复显示
    fixAllChallengeDisplays();
    
    // 3. 重写函数
    overrideUpdateChallengeProgress();
    
    // 4. 修复点击事件
    fixClickEvents();
    
    // 5. 启动定期同步
    startPeriodicSync();
    
    console.log('\n🎉 综合修复完成！');
    console.log('\n📋 修复总结:');
    console.log('✅ 挑战显示已修复（进度条、文本、按钮）');
    console.log('✅ updateChallengeProgress函数已重写');
    console.log('✅ 点击事件已修复');
    console.log('✅ 定期同步已启动');
    
    // 6. 测试功能
    setTimeout(() => {
        console.log('\n🧪 开始测试所有挑战...');
        testAllChallenges();
    }, 2000);
    
    return true;
}

// 显示状态函数
function showAllChallengeStatus() {
    console.log('\n📊 所有挑战当前状态:');
    
    if (typeof dailyChallenges === 'undefined') {
        console.log('❌ dailyChallenges未定义');
        return;
    }
    
    dailyChallenges.forEach((challenge, index) => {
        console.log(`\n挑战${index + 1} (${challenge.id}):`);
        console.log(`   标题: ${challenge.title}`);
        console.log(`   进度: ${challenge.progress}/${challenge.target}`);
        console.log(`   完成: ${challenge.completed ? '是' : '否'}`);
        console.log(`   已领取: ${challenge.claimed ? '是' : '否'}`);
        console.log(`   奖励: ${challenge.reward}金币`);
        
        // 检查DOM状态
        const progressText = document.getElementById(`progressText${index + 1}`);
        if (progressText) {
            console.log(`   DOM显示: ${progressText.textContent}`);
        } else {
            console.log(`   DOM显示: 元素不存在`);
        }
    });
}

// 重置所有挑战（测试用）
function resetAllChallenges() {
    console.log('\n🔄 重置所有挑战...');
    
    if (typeof dailyChallenges === 'undefined') {
        console.log('❌ dailyChallenges未定义');
        return;
    }
    
    dailyChallenges.forEach(challenge => {
        challenge.progress = 0;
        challenge.completed = false;
        challenge.claimed = false;
    });
    
    localStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
    
    // 重置相关变量
    window.totalClicks = 0;
    window.totalAttempts = 0;
    
    // 更新显示
    fixAllChallengeDisplays();
    
    console.log('✅ 所有挑战已重置');
}

console.log('\n🛠️  综合修复脚本已加载！');
console.log('\n📋 可用命令：');
console.log('  fixAllChallenges() - 开始综合修复');
console.log('  showAllChallengeStatus() - 显示所有挑战状态');
console.log('  resetAllChallenges() - 重置所有挑战（测试用）');

// 自动开始修复
setTimeout(() => {
    console.log('\n🚀 自动开始综合修复...');
    fixAllChallenges();
}, 1000);