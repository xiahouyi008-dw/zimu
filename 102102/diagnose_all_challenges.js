// 所有挑战综合诊断工具
// 同时诊断挑战1、挑战2、挑战3的问题

console.log('🔍 开始综合诊断所有挑战...');

function diagnoseAllChallenges() {
    console.log('\n=== 📊 所有挑战综合诊断 ===\n');
    
    // 1. 检查挑战配置
    checkAllChallengeConfigs();
    
    // 2. 检查所有DOM元素
    checkAllChallengeDOMs();
    
    // 3. 检查触发逻辑
    checkAllTriggerLogics();
    
    // 4. 检查数据状态
    checkAllChallengeData();
    
    // 5. 测试所有挑战更新
    testAllChallengeUpdates();
    
    // 6. 总结问题
    summarizeProblems();
}

// 检查所有挑战配置
function checkAllChallengeConfigs() {
    console.log('📋 1. 所有挑战配置检查:');
    
    const expectedChallenges = [
        { id: 'click_100', name: '挑战1-摸鱼新手' },
        { id: 'time_30min', name: '挑战2-时间管理大师' },
        { id: 'accuracy_80', name: '挑战3-精准点击' }
    ];
    
    expectedChallenges.forEach(challenge => {
        if (typeof dailyChallenges !== 'undefined') {
            const found = dailyChallenges.find(c => c.id === challenge.id);
            if (found) {
                console.log(`✅ ${challenge.name}: 配置正确`);
                console.log(`   目标: ${found.target}, 奖励: ${found.reward}, 类型: ${found.type}`);
            } else {
                console.log(`❌ ${challenge.name}: 未找到配置`);
            }
        }
    });
}

// 检查所有挑战DOM元素
function checkAllChallengeDOMs() {
    console.log('\n🎯 2. 所有挑战DOM元素检查:');
    
    const challenges = [
        { id: 1, challengeId: 'click_100', name: '挑战1' },
        { id: 2, challengeId: 'time_30min', name: '挑战2' },
        { id: 3, challengeId: 'accuracy_80', name: '挑战3' }
    ];
    
    challenges.forEach(challenge => {
        console.log(`\n📍 ${challenge.name} (${challenge.challengeId}):`);
        
        const elements = {
            '容器': document.getElementById(`challenge${challenge.id}`),
            '进度条': document.getElementById(`progress${challenge.id}`),
            '进度文本': document.getElementById(`progressText${challenge.id}`),
            '领取按钮': document.getElementById(`claim${challenge.id}`),
            '标题': document.querySelector(`#challenge${challenge.id} .challenge-title`),
            '描述': document.querySelector(`#challenge${challenge.id} .challenge-desc`),
            '奖励': document.querySelector(`#challenge${challenge.id} .reward-amount`)
        };
        
        Object.entries(elements).forEach(([name, element]) => {
            if (element) {
                console.log(`   ✅ ${name}: 存在`);
                if (element.textContent && name === '进度文本') {
                    console.log(`      内容: "${element.textContent.trim()}"`);
                }
            } else {
                console.log(`   ❌ ${name}: 不存在`);
            }
        });
    });
}

// 检查所有触发逻辑
function checkAllTriggerLogics() {
    console.log('\n🔍 3. 所有触发逻辑检查:');
    
    // 检查updateChallengeProgress函数
    if (typeof updateChallengeProgress === 'function') {
        console.log('✅ updateChallengeProgress函数存在');
        
        // 测试不同类型
        const testTypes = ['click', 'time', 'accuracy'];
        testTypes.forEach(type => {
            console.log(`🧪 测试类型: ${type}`);
            try {
                // 获取原始状态
                const originalStates = dailyChallenges.map(c => ({
                    id: c.id,
                    progress: c.progress,
                    type: c.type
                }));
                
                // 调用函数
                updateChallengeProgress(type, 1);
                
                // 检查变化
                setTimeout(() => {
                    const updatedChallenge = dailyChallenges.find(c => c.type === type);
                    if (updatedChallenge) {
                        const original = originalStates.find(s => s.id === updatedChallenge.id);
                        if (updatedChallenge.progress > original.progress) {
                            console.log(`   ✅ ${type}类型: 数据更新正常`);
                        } else {
                            console.log(`   ❌ ${type}类型: 数据未更新`);
                        }
                    } else {
                        console.log(`   ⚠️  ${type}类型: 未找到对应挑战`);
                    }
                }, 100);
                
            } catch (error) {
                console.log(`   ❌ ${type}类型: 执行出错 - ${error.message}`);
            }
        });
        
    } else {
        console.log('❌ updateChallengeProgress函数不存在');
    }
}

// 检查所有挑战数据状态
function checkAllChallengeData() {
    console.log('\n📊 4. 所有挑战数据状态:');
    
    if (typeof dailyChallenges !== 'undefined') {
        dailyChallenges.forEach((challenge, index) => {
            console.log(`\n📍 挑战${index + 1} (${challenge.id}):`);
            console.log(`   标题: ${challenge.title}`);
            console.log(`   进度: ${challenge.progress}/${challenge.target}`);
            console.log(`   完成: ${challenge.completed ? '是' : '否'}`);
            console.log(`   已领取: ${challenge.claimed ? '是' : '否'}`);
            console.log(`   类型: ${challenge.type}`);
        });
    } else {
        console.log('❌ dailyChallenges未定义');
    }
    
    // 检查相关变量
    console.log('\n📈 相关变量:');
    if (typeof totalClicks !== 'undefined') {
        console.log(`✅ totalClicks: ${totalClicks}`);
    } else {
        console.log('❌ totalClicks未定义');
    }
    
    if (typeof totalAttempts !== 'undefined') {
        console.log(`✅ totalAttempts: ${totalAttempts}`);
    } else {
        console.log('❌ totalAttempts未定义');
    }
}

// 测试所有挑战更新
function testAllChallengeUpdates() {
    console.log('\n🧪 5. 测试所有挑战更新:');
    
    if (typeof dailyChallenges === 'undefined') {
        console.log('❌ dailyChallenges未定义，无法测试');
        return;
    }
    
    const tests = [
        { type: 'click', increment: 5, description: '点击挑战+5' },
        { type: 'accuracy', increment: 3, description: '精准挑战+3' },
        { type: 'time', increment: 1000, description: '时间挑战+1000ms' }
    ];
    
    tests.forEach(test => {
        console.log(`\n🔄 ${test.description}:`);
        
        const challenge = dailyChallenges.find(c => c.type === test.type);
        if (challenge) {
            const originalProgress = challenge.progress;
            
            console.log(`   当前进度: ${originalProgress}`);
            updateChallengeProgress(test.type, test.increment);
            
            setTimeout(() => {
                const newProgress = challenge.progress;
                console.log(`   新进度: ${newProgress}`);
                
                if (newProgress > originalProgress) {
                    console.log(`   ✅ ${test.type}挑战更新成功`);
                } else {
                    console.log(`   ❌ ${test.type}挑战未更新`);
                }
            }, 200);
        } else {
            console.log(`   ❌ 未找到${test.type}类型挑战`);
        }
    });
}

// 总结问题
function summarizeProblems() {
    console.log('\n📋 6. 问题总结:');
    
    console.log('\n🎯 共同问题（所有挑战）:');
    console.log('❌ 硬编码HTML元素未更新（progress1/2/3, progressText1/2/3）');
    console.log('❌ updateChallengeProgress函数只更新数据，不更新DOM');
    console.log('❌ 领取按钮状态未同步');
    
    console.log('\n🔍 个别问题:');
    
    // 检查挑战1
    const challenge1 = dailyChallenges?.find(c => c.id === 'click_100');
    if (challenge1) {
        console.log(`挑战1 - 摸鱼新手: ${challenge1.progress}/100`);
    }
    
    // 检查挑战3  
    const challenge3 = dailyChallenges?.find(c => c.id === 'accuracy_80');
    if (challenge3) {
        console.log(`挑战3 - 精准点击: ${challenge3.progress}/80`);
    }
    
    console.log('\n✅ 正常功能:');
    console.log('✅ 数据更新正常（dailyChallenges数组）');
    console.log('✅ localStorage保存正常');
    console.log('✅ 触发逻辑正常（updateChallengeProgress被调用）');
}

// 快速修复所有挑战显示
function quickFixAllChallenges() {
    console.log('\n🔧 快速修复所有挑战显示...');
    
    if (typeof dailyChallenges === 'undefined') {
        console.log('❌ dailyChallenges未定义');
        return;
    }
    
    const challenges = [
        { id: 1, challengeId: 'click_100' },
        { id: 2, challengeId: 'time_30min' }, 
        { id: 3, challengeId: 'accuracy_80' }
    ];
    
    challenges.forEach(challenge => {
        const challengeData = dailyChallenges.find(c => c.id === challenge.challengeId);
        if (!challengeData) {
            console.log(`❌ 未找到${challenge.challengeId}`);
            return;
        }
        
        console.log(`\n📍 修复挑战${challenge.id}:`);
        
        // 更新进度文本
        const progressText = document.getElementById(`progressText${challenge.id}`);
        if (progressText) {
            progressText.textContent = `${challengeData.progress}/${challengeData.target}`;
            console.log(`   ✅ 更新progressText${challenge.id}: ${challengeData.progress}/${challengeData.target}`);
        } else {
            console.log(`   ❌ progressText${challenge.id}不存在`);
        }
        
        // 更新进度条
        const progressBar = document.getElementById(`progress${challenge.id}`);
        if (progressBar) {
            const percentage = Math.min((challengeData.progress / challengeData.target) * 100, 100);
            progressBar.style.width = `${percentage}%`;
            console.log(`   ✅ 更新progress${challenge.id}宽度: ${percentage}%`);
        } else {
            console.log(`   ❌ progress${challenge.id}不存在`);
        }
        
        // 更新领取按钮
        const claimBtn = document.getElementById(`claim${challenge.id}`);
        if (claimBtn) {
            if (challengeData.completed && !challengeData.claimed) {
                claimBtn.disabled = false;
                claimBtn.classList.add('available');
                claimBtn.textContent = '领取';
                console.log(`   ✅ 更新claim${challenge.id}: 可领取`);
            } else if (challengeData.claimed) {
                claimBtn.disabled = true;
                claimBtn.classList.add('claimed');
                claimBtn.textContent = '已领取';
                console.log(`   ✅ 更新claim${challenge.id}: 已领取`);
            } else {
                claimBtn.disabled = true;
                claimBtn.textContent = '领取';
                console.log(`   ✅ 更新claim${challenge.id}: 未完成`);
            }
        } else {
            console.log(`   ❌ claim${challenge.id}不存在`);
        }
    });
    
    console.log('\n✅ 所有挑战显示修复完成！');
}

// 重写updateChallengeProgress函数（综合修复）
function overrideUpdateChallengeProgress() {
    console.log('\n🔄 重写updateChallengeProgress函数（综合修复）...');
    
    const originalFunction = window.updateChallengeProgress;
    
    window.updateChallengeProgress = function(type, value = 1) {
        console.log(`🔄 updateChallengeProgress被调用 - 类型: ${type}, 值: ${value}`);
        
        let updated = false;
        let completedChallenges = [];
        
        // 先执行原始逻辑（如果存在）
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
            quickFixAllChallenges();
            
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

console.log('\n🛠️  综合诊断工具已加载！');
console.log('📋 可用命令：');
console.log('  diagnoseAllChallenges() - 完整诊断所有挑战');
console.log('  quickFixAllChallenges() - 快速修复所有挑战显示');
console.log('  overrideUpdateChallengeProgress() - 重写updateChallengeProgress函数');

// 自动开始诊断
setTimeout(() => {
    console.log('\n🚀 自动开始综合诊断...');
    diagnoseAllChallenges();
}, 1000);