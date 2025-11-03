// 挑战1 - 摸鱼新手 诊断工具
// 用于诊断点击100次挑战的问题

console.log('🔍 开始诊断挑战1 - 摸鱼新手...');

function diagnoseChallenge1() {
    console.log('\n=== 📊 挑战1完整诊断 ===\n');
    
    // 1. 检查挑战配置
    checkChallenge1Config();
    
    // 2. 检查DOM元素
    checkChallenge1DOM();
    
    // 3. 检查事件监听
    checkClickEventListeners();
    
    // 4. 检查数据状态
    checkChallenge1Data();
    
    // 5. 检查触发逻辑
    checkClickTriggerLogic();
    
    // 6. 测试挑战1更新
    testChallenge1Update();
}

// 检查挑战1配置
function checkChallenge1Config() {
    console.log('📋 1. 挑战1配置检查:');
    
    if (typeof CHALLENGES !== 'undefined') {
        const challenge1 = CHALLENGES.find(c => c.id === 'click_100');
        if (challenge1) {
            console.log('✅ 找到挑战1配置:', challenge1);
        } else {
            console.log('❌ 未找到挑战1配置');
        }
    } else {
        console.log('⚠️  CHALLENGES未定义，检查dailyChallenges...');
        if (typeof dailyChallenges !== 'undefined' && dailyChallenges.length > 0) {
            const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
            if (challenge1) {
                console.log('✅ 找到挑战1数据:', challenge1);
            } else {
                console.log('❌ 未找到挑战1数据');
            }
        }
    }
}

// 检查挑战1DOM元素
function checkChallenge1DOM() {
    console.log('\n🎯 2. DOM元素检查:');
    
    // 检查硬编码元素
    const elements = {
        'challenge1容器': document.getElementById('challenge1'),
        'progress1进度条': document.getElementById('progress1'),
        'progressText1文本': document.getElementById('progressText1'),
        'claim1领取按钮': document.getElementById('claim1'),
        'challenge1标题': document.querySelector('#challenge1 .challenge-title'),
        'challenge1描述': document.querySelector('#challenge1 .challenge-desc'),
        'challenge1奖励': document.querySelector('#challenge1 .reward-amount')
    };
    
    Object.entries(elements).forEach(([name, element]) => {
        if (element) {
            console.log(`✅ ${name}: 存在`);
            if (element.textContent) {
                console.log(`   内容: "${element.textContent.trim()}"`);
            }
        } else {
            console.log(`❌ ${name}: 不存在`);
        }
    });
}

// 检查点击事件监听
function checkClickEventListeners() {
    console.log('\n🖱️ 3. 点击事件监听检查:');
    
    // 检查canvas点击事件
    const canvas = document.getElementById('coinCanvas');
    if (canvas) {
        console.log('✅ 找到canvas元素');
        
        // 检查是否有点击事件监听
        const listeners = getEventListeners ? getEventListeners(canvas, 'click') : null;
        if (listeners && listeners.length > 0) {
            console.log(`✅ canvas有${listeners.length}个点击事件监听`);
        } else {
            console.log('⚠️  无法检测canvas点击事件监听');
        }
    } else {
        console.log('❌ 未找到canvas元素');
    }
}

// 检查挑战1数据状态
function checkChallenge1Data() {
    console.log('\n📊 4. 数据状态检查:');
    
    if (typeof dailyChallenges !== 'undefined') {
        const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
        if (challenge1) {
            console.log('✅ 挑战1当前状态:');
            console.log(`   进度: ${challenge1.progress}/${challenge1.target}`);
            console.log(`   完成: ${challenge1.completed}`);
            console.log(`   已领取: ${challenge1.claimed}`);
            console.log(`   类型: ${challenge1.type}`);
        } else {
            console.log('❌ dailyChallenges中未找到挑战1');
        }
    } else {
        console.log('❌ dailyChallenges未定义');
    }
    
    // 检查totalClicks
    if (typeof totalClicks !== 'undefined') {
        console.log(`✅ totalClicks: ${totalClicks}`);
    } else {
        console.log('❌ totalClicks未定义');
    }
}

// 检查点击触发逻辑
function checkClickTriggerLogic() {
    console.log('\n🔍 5. 点击触发逻辑检查:');
    
    // 检查updateChallengeProgress函数
    if (typeof updateChallengeProgress === 'function') {
        console.log('✅ updateChallengeProgress函数存在');
        
        // 测试调用
        console.log('🧪 测试updateChallengeProgress("click", 1)...');
        const originalProgress = dailyChallenges.find(c => c.id === 'click_100')?.progress || 0;
        updateChallengeProgress('click', 1);
        
        setTimeout(() => {
            const newProgress = dailyChallenges.find(c => c.id === 'click_100')?.progress || 0;
            console.log(`   进度变化: ${originalProgress} → ${newProgress}`);
            
            if (newProgress > originalProgress) {
                console.log('✅ updateChallengeProgress函数工作正常');
            } else {
                console.log('❌ updateChallengeProgress函数未更新进度');
            }
        }, 100);
        
    } else {
        console.log('❌ updateChallengeProgress函数不存在');
    }
}

// 测试挑战1更新
function testChallenge1Update() {
    console.log('\n🧪 6. 挑战1更新测试:');
    
    if (typeof dailyChallenges !== 'undefined') {
        const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
        if (challenge1) {
            const originalProgress = challenge1.progress;
            
            console.log(`当前进度: ${originalProgress}`);
            console.log('执行: updateChallengeProgress("click", 5)...');
            
            updateChallengeProgress('click', 5);
            
            setTimeout(() => {
                const newProgress = challenge1.progress;
                console.log(`新进度: ${newProgress}`);
                
                if (newProgress > originalProgress) {
                    console.log('✅ 挑战1数据更新成功');
                } else {
                    console.log('❌ 挑战1数据未更新');
                }
                
                // 检查显示更新
                checkDisplayUpdate();
            }, 200);
        }
    }
}

// 检查显示更新
function checkDisplayUpdate() {
    console.log('\n🖥️  显示更新检查:');
    
    const progressText = document.getElementById('progressText1');
    const progressBar = document.getElementById('progress1');
    
    if (progressText) {
        const currentText = progressText.textContent;
        console.log(`progressText1当前内容: "${currentText}"`);
        
        const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
        if (challenge1) {
            const expectedText = `${challenge1.progress}/${challenge1.target}`;
            if (currentText.includes(challenge1.progress)) {
                console.log('✅ 进度文本显示正确');
            } else {
                console.log(`❌ 进度文本不匹配，期望: "${expectedText}"`);
                console.log('需要修复显示更新...');
            }
        }
    } else {
        console.log('❌ progressText1元素不存在');
    }
    
    if (progressBar) {
        const currentWidth = progressBar.style.width;
        console.log(`progress1当前宽度: ${currentWidth}`);
    }
}

// 快速修复挑战1显示
function quickFixChallenge1() {
    console.log('\n🔧 快速修复挑战1显示...');
    
    const challenge1 = dailyChallenges.find(c => c.id === 'click_100');
    if (!challenge1) {
        console.log('❌ 未找到挑战1');
        return;
    }
    
    // 更新进度文本
    const progressText1 = document.getElementById('progressText1');
    if (progressText1) {
        progressText1.textContent = `${challenge1.progress}/${challenge1.target}`;
        console.log('✅ 更新progressText1');
    }
    
    // 更新进度条
    const progress1 = document.getElementById('progress1');
    if (progress1) {
        const percentage = (challenge1.progress / challenge1.target) * 100;
        progress1.style.width = `${percentage}%`;
        console.log('✅ 更新progress1宽度');
    }
    
    // 更新领取按钮状态
    const claim1 = document.getElementById('claim1');
    if (claim1 && challenge1.completed && !challenge1.claimed) {
        claim1.disabled = false;
        claim1.classList.add('available');
        console.log('✅ 更新claim1按钮状态');
    }
    
    console.log('✅ 挑战1显示修复完成！');
}

// 监听控制台消息
const originalLog = console.log;
console.log = function(...args) {
    if (args[0] && args[0].toString().includes('click')) {
        originalLog.apply(console, ['🖱️ ' + args[0], ...args.slice(1)]);
    } else {
        originalLog.apply(console, args);
    }
};

console.log('\n🛠️  诊断工具已加载！');
console.log('📋 可用命令：');
console.log('  diagnoseChallenge1() - 完整诊断');
console.log('  quickFixChallenge1() - 快速修复显示');
console.log('  checkChallenge1Data() - 检查数据状态');
console.log('  checkDisplayUpdate() - 检查显示更新');

// 自动开始诊断
setTimeout(() => {
    console.log('\n🚀 自动开始诊断...');
    diagnoseChallenge1();
}, 1000);