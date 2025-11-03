// 挑战3 - 精准点击 诊断工具
// 用于检测挑战3的各种问题

(function() {
    'use strict';
    
    console.log('🔍 挑战3诊断工具启动...');
    
    // 诊断函数
    function diagnoseChallenge3() {
        console.log('=== 🎯 挑战3 - 精准点击 诊断报告 ===\\n');
        
        // 1. 检查挑战配置
        checkChallengeConfig();
        
        // 2. 检查DOM元素
        checkDOMElements();
        
        // 3. 检查事件监听
        checkEventListeners();
        
        // 4. 检查数据状态
        checkDataStatus();
        
        // 5. 检查触发逻辑
        checkTriggerLogic();
        
        // 6. 检查奖励配置
        checkRewardConfig();
        
        console.log('\\n=== 诊断完成 ===');
    }
    
    // 1. 检查挑战配置
    function checkChallengeConfig() {
        console.log('📋 1. 挑战配置检查:');
        
        if (typeof CHALLENGES !== 'undefined') {
            const challenge3 = CHALLENGES.find(c => c.id === 'accuracy_80');
            if (challenge3) {
                console.log('✅ 找到挑战3配置:');
                console.log(`   - ID: ${challenge3.id}`);
                console.log(`   - 标题: ${challenge3.title}`);
                console.log(`   - 描述: ${challenge3.description}`);
                console.log(`   - 目标: ${challenge3.target}`);
                console.log(`   - 奖励: ${challenge3.reward}金币`);
                console.log(`   - 类型: ${challenge3.type}`);
            } else {
                console.log('❌ 未找到挑战3配置');
            }
        } else {
            console.log('❌ CHALLENGES未定义');
        }
    }
    
    // 2. 检查DOM元素
    function checkDOMElements() {
        console.log('\\n🏗️ 2. DOM元素检查:');
        
        const elements = {
            'challenge3': document.getElementById('challenge3'),
            'progress3': document.getElementById('progress3'),
            'progressText3': document.getElementById('progressText3'),
            'claim3': document.getElementById('claim3')
        };
        
        Object.keys(elements).forEach(key => {
            const element = elements[key];
            if (element) {
                console.log(`✅ ${key} 元素存在`);
                if (key === 'progress3') {
                    console.log(`   - 当前宽度: ${element.style.width || '未设置'}`);
                }
                if (key === 'progressText3') {
                    console.log(`   - 当前文本: ${element.textContent}`);
                }
                if (key === 'claim3') {
                    console.log(`   - 当前状态: ${element.disabled ? '禁用' : '启用'}`);
                    console.log(`   - 当前文本: ${element.textContent}`);
                }
            } else {
                console.log(`❌ ${key} 元素不存在`);
            }
        });
        
        // 检查奖励金额显示
        const rewardElement = document.querySelector('#challenge3 .reward-amount');
        if (rewardElement) {
            console.log(`✅ 奖励金额元素存在: ${rewardElement.textContent}`);
        } else {
            console.log('❌ 奖励金额元素不存在');
        }
    }
    
    // 3. 检查事件监听
    function checkEventListeners() {
        console.log('\\n🎧 3. 事件监听检查:');
        
        // 检查canvas点击事件
        const canvas = document.getElementById('coinCanvas');
        if (canvas) {
            console.log('✅ Canvas元素存在');
            // 这里无法直接检查事件监听器，但可以检查点击逻辑
        } else {
            console.log('❌ Canvas元素不存在');
        }
        
        // 检查挑战3领取按钮
        const claimBtn3 = document.getElementById('claim3');
        if (claimBtn3) {
            console.log('✅ 挑战3领取按钮存在');
            console.log(`   - 当前状态: ${claimBtn3.disabled ? '禁用' : '启用'}`);
            console.log(`   - onclick属性: ${claimBtn3.getAttribute('onclick')}`);
        }
    }
    
    // 4. 检查数据状态
    function checkDataStatus() {
        console.log('\\n📊 4. 数据状态检查:');
        
        if (typeof dailyChallenges !== 'undefined') {
            const challenge3 = dailyChallenges.find(c => c.id === 'accuracy_80');
            if (challenge3) {
                console.log('✅ 找到挑战3数据:');
                console.log(`   - 当前进度: ${challenge3.progress}`);
                console.log(`   - 目标: ${challenge3.target}`);
                console.log(`   - 完成状态: ${challenge3.completed ? '已完成' : '未完成'}`);
                console.log(`   - 领取状态: ${challenge3.claimed ? '已领取' : '未领取'}`);
                console.log(`   - 奖励: ${challenge3.reward}金币`);
                
                // 检查其他相关数据
                if (typeof totalAttempts !== 'undefined') {
                    console.log(`   - 总尝试次数: ${totalAttempts}`);
                }
                if (typeof totalClicks !== 'undefined') {
                    console.log(`   - 总点击次数: ${totalClicks}`);
                }
            } else {
                console.log('❌ 未找到挑战3数据');
            }
        } else {
            console.log('❌ dailyChallenges未定义');
        }
        
        // 检查localStorage
        const savedChallenges = localStorage.getItem('dailyChallenges');
        if (savedChallenges) {
            try {
                const challenges = JSON.parse(savedChallenges);
                const challenge3 = challenges.find(c => c.id === 'accuracy_80');
                if (challenge3) {
                    console.log('✅ localStorage中找到挑战3数据:');
                    console.log(`   - 进度: ${challenge3.progress}`);
                    console.log(`   - 完成: ${challenge3.completed}`);
                }
            } catch (e) {
                console.log('❌ localStorage数据解析失败');
            }
        } else {
            console.log('⚠️ localStorage中无挑战数据');
        }
    }
    
    // 5. 检查触发逻辑
    function checkTriggerLogic() {
        console.log('\\n⚡ 5. 触发逻辑检查:');
        
        // 查找updateChallengeProgress的accuracy类型调用
        if (typeof updateChallengeProgress === 'function') {
            console.log('✅ updateChallengeProgress函数存在');
            
            // 检查函数源码
            const funcStr = updateChallengeProgress.toString();
            if (funcStr.includes('accuracy')) {
                console.log('✅ updateChallengeProgress包含accuracy类型处理');
            } else {
                console.log('❌ updateChallengeProgress不包含accuracy类型处理');
            }
            
            if (funcStr.includes('精准点击挑战')) {
                console.log('✅ 包含精准点击挑战日志');
            } else {
                console.log('⚠️ 不包含精准点击挑战日志');
            }
        } else {
            console.log('❌ updateChallengeProgress函数不存在');
        }
        
        // 检查点击事件中的触发逻辑
        console.log('\\n📍 点击事件触发检查:');
        console.log('在摸鱼金币.html第5046行查找:');
        console.log('totalAttempts++; // 总尝试次数增加');
        console.log('if (coinClicked) { updateChallengeProgress(\"accuracy\", 1); }');
    }
    
    // 6. 检查奖励配置
    function checkRewardConfig() {
        console.log('\\n💰 6. 奖励配置检查:');
        
        // 检查配置vs显示的奖励金额
        if (typeof CHALLENGES !== 'undefined') {
            const challenge3 = CHALLENGES.find(c => c.id === 'accuracy_80');
            const rewardElement = document.querySelector('#challenge3 .reward-amount');
            
            if (challenge3 && rewardElement) {
                const configReward = challenge3.reward;
                const displayReward = rewardElement.textContent;
                console.log(`配置奖励: ${configReward}金币`);
                console.log(`显示奖励: ${displayReward}`);
                
                if (displayReward.includes(configReward.toString())) {
                    console.log('✅ 奖励金额匹配');
                } else {
                    console.log('❌ 奖励金额不匹配！');
                    console.log(`   配置: ${configReward}金币`);
                    console.log(`   显示: ${displayReward}`);
                }
            }
        }
    }
    
    // 添加测试函数
    function addTestFunctions() {
        window.testAccuracyChallenge = function() {
            console.log('🧪 测试精准点击挑战...');
            
            // 模拟成功点击
            if (typeof updateChallengeProgress === 'function') {
                console.log('模拟5次成功点击...');
                for (let i = 0; i < 5; i++) {
                    updateChallengeProgress('accuracy', 1);
                }
                console.log('✅ 测试调用完成，请查看挑战3进度是否更新');
            } else {
                console.log('❌ updateChallengeProgress函数不可用');
            }
        };
        
        window.checkAccuracyProgress = function() {
            const challenge = dailyChallenges.find(c => c.id === 'accuracy_80');
            if (challenge) {
                console.log('📊 挑战3当前状态:');
                console.log(`   进度: ${challenge.progress}/${challenge.target}`);
                console.log(`   完成: ${challenge.completed ? '是' : '否'}`);
                console.log(`   已领取: ${challenge.claimed ? '是' : '否'}`);
            }
        };
        
        console.log('\\n💡 测试函数已添加:');
        console.log('   testAccuracyChallenge() - 测试挑战3更新');
        console.log('   checkAccuracyProgress() - 查看挑战3状态');
    }
    
    // 启动诊断
    diagnoseChallenge3();
    addTestFunctions();
    
})();