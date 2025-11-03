// 修复挑战系统 - 确保挑战进度正确更新
console.log('=== 挑战系统修复开始 ===');

// 备份原始的updateChallengeProgress函数
const originalUpdateChallengeProgress = window.updateChallengeProgress;

// 重写updateChallengeProgress函数来修复问题
window.updateChallengeProgress = function(type, value = 1) {
    console.log('🔄 [修复版] 更新挑战进度 - 类型:', type, '值:', value);
    
    if (!dailyChallenges || dailyChallenges.length === 0) {
        console.log('⚠️ 挑战数据未初始化，正在初始化...');
        initDailyChallenges();
        return;
    }
    
    let updated = false;
    let completedChallenge = null;
    
    dailyChallenges.forEach(challenge => {
        if (challenge.type === type && !challenge.completed) {
            console.log('✅ 找到匹配挑战:', challenge.title, '当前进度:', challenge.progress);
            
            if (type === 'click') {
                challenge.progress += value;
                console.log('📈 点击挑战进度更新:', challenge.progress, '/', challenge.target);
            } else if (type === 'time') {
                challenge.progress = Math.min(challenge.progress + value, challenge.target);
            } else if (type === 'accuracy') {
                challenge.progress += value;
                console.log('🎯 精准点击挑战进度更新:', challenge.progress, '/', challenge.target);
            }
            
            if (challenge.progress >= challenge.target) {
                challenge.completed = true;
                completedChallenge = challenge;
                console.log('🎉 挑战完成:', challenge.title);
                showChallengeCompleteNotification(challenge);
            }
            
            updated = true;
        }
    });
    
    if (updated) {
        console.log('💾 保存挑战数据到本地存储');
        localStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
        
        // 更新显示
        updateChallengeDisplay();
        updateChallengeDisplayLegacy(); // 更新硬编码的挑战显示
        
        console.log('✅ 挑战进度更新完成');
    } else {
        console.log('⚠️ 没有找到匹配的挑战类型');
    }
};

// 新增函数：更新硬编码的挑战显示
function updateChallengeDisplayLegacy() {
    console.log('🔄 更新硬编码挑战显示');
    
    if (!dailyChallenges || dailyChallenges.length === 0) {
        console.log('⚠️ 没有挑战数据');
        return;
    }
    
    // 更新第一个挑战（摸鱼新手 - 点击100次）
    const clickChallenge = dailyChallenges.find(c => c.id === 'click_100');
    if (clickChallenge) {
        console.log('📊 找到点击挑战:', clickChallenge);
        
        const progress1 = document.getElementById('progress1');
        const progressText1 = document.getElementById('progressText1');
        const claim1 = document.getElementById('claim1');
        const challenge1 = document.getElementById('challenge1');
        
        if (progress1 && progressText1 && claim1 && challenge1) {
            const progressPercent = Math.min((clickChallenge.progress / clickChallenge.target) * 100, 100);
            
            progress1.style.width = progressPercent + '%';
            progressText1.textContent = `${clickChallenge.progress}/${clickChallenge.target}`;
            
            if (clickChallenge.completed) {
                claim1.disabled = false;
                claim1.textContent = clickChallenge.claimed ? '已领取' : '领取';
                claim1.className = clickChallenge.claimed ? 'claim-btn claimed' : 'claim-btn available';
                challenge1.classList.add('completed');
                console.log('✅ 挑战完成状态已更新');
            } else {
                claim1.disabled = true;
                claim1.textContent = '领取';
                claim1.className = 'claim-btn';
                challenge1.classList.remove('completed');
            }
            
            console.log('✅ 硬编码挑战显示已更新');
        } else {
            console.log('⚠️ 找不到硬编码挑战元素');
        }
    }
    
    // 更新第二个挑战（时间管理大师 - 30分钟）
    const timeChallenge = dailyChallenges.find(c => c.id === 'time_30min');
    if (timeChallenge) {
        const progress2 = document.getElementById('progress2');
        const progressText2 = document.getElementById('progressText2');
        const claim2 = document.getElementById('claim2');
        const challenge2 = document.getElementById('challenge2');
        
        if (progress2 && progressText2 && claim2 && challenge2) {
            const progressPercent = Math.min((timeChallenge.progress / timeChallenge.target) * 100, 100);
            
            progress2.style.width = progressPercent + '%';
            progressText2.textContent = `${Math.floor(timeChallenge.progress / 60000)}/${Math.floor(timeChallenge.target / 60000)}分钟`;
            
            if (timeChallenge.completed) {
                claim2.disabled = false;
                claim2.textContent = timeChallenge.claimed ? '已领取' : '领取';
                claim2.className = timeChallenge.claimed ? 'claim-btn claimed' : 'claim-btn available';
                challenge2.classList.add('completed');
            } else {
                claim2.disabled = true;
                claim2.textContent = '领取';
                claim2.className = 'claim-btn';
                challenge2.classList.remove('completed');
            }
        }
    }
    
    // 更新第三个挑战（精准点击 - 80次）
    const accuracyChallenge = dailyChallenges.find(c => c.id === 'accuracy_80');
    if (accuracyChallenge) {
        const progress3 = document.getElementById('progress3');
        const progressText3 = document.getElementById('progressText3');
        const claim3 = document.getElementById('claim3');
        const challenge3 = document.getElementById('challenge3');
        
        if (progress3 && progressText3 && claim3 && challenge3) {
            const progressPercent = Math.min((accuracyChallenge.progress / accuracyChallenge.target) * 100, 100);
            
            progress3.style.width = progressPercent + '%';
            progressText3.textContent = `${accuracyChallenge.progress}/${accuracyChallenge.target}`;
            
            if (accuracyChallenge.completed) {
                claim3.disabled = false;
                claim3.textContent = accuracyChallenge.claimed ? '已领取' : '领取';
                claim3.className = accuracyChallenge.claimed ? 'claim-btn claimed' : 'claim-btn available';
                challenge3.classList.add('completed');
            } else {
                claim3.disabled = true;
                claim3.textContent = '领取';
                claim3.className = 'claim-btn';
                challenge3.classList.remove('completed');
            }
        }
    }
}

// 修复领取奖励函数
function fixClaimRewards() {
    console.log('🔄 修复领取奖励函数');
    
    // 确保领取奖励函数存在且工作正常
    window.claimChallengeReward = function(index) {
        console.log('🎁 领取挑战奖励 - 索引:', index);
        
        if (!dailyChallenges || dailyChallenges.length === 0) {
            console.log('⚠️ 挑战数据未初始化');
            return;
        }
        
        const challenge = dailyChallenges[index];
        if (!challenge) {
            console.log('⚠️ 找不到挑战');
            return;
        }
        
        if (challenge.completed && !challenge.claimed) {
            challenge.claimed = true;
            
            // 增加金币
            if (typeof money !== 'undefined') {
                money += challenge.reward;
                console.log(`💰 奖励已添加: ${challenge.reward}金币, 当前金币: ${money}`);
            }
            
            // 显示通知
            if (typeof showNotification === 'function') {
                showNotification(`+${challenge.reward}金币奖励已领取!`, 'achievement');
            }
            
            // 更新统计
            if (typeof updateStats === 'function') {
                updateStats();
            }
            
            // 保存数据
            localStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
            
            // 更新显示
            updateChallengeDisplay();
            updateChallengeDisplayLegacy();
            
            console.log('✅ 奖励领取完成');
        } else {
            console.log('⚠️ 无法领取奖励 - 挑战未完成或已领取');
        }
    };
}

// 修复初始化函数
function fixInitFunction() {
    console.log('🔄 修复初始化函数');
    
    // 确保挑战系统在初始化时正确启动
    const originalInit = window.init;
    if (originalInit) {
        window.init = function() {
            console.log('🚀 开始初始化游戏...');
            
            // 先调用原始初始化
            originalInit.call(this);
            
            // 确保挑战系统初始化
            if (typeof initDailyChallenges === 'function') {
                console.log('🎯 初始化挑战系统...');
                initDailyChallenges();
            }
            
            console.log('✅ 游戏初始化完成');
        };
    }
}

// 显示修复状态
function showFixStatus() {
    console.log('📊 修复状态报告:');
    console.log('   ✅ updateChallengeProgress 函数已修复');
    console.log('   ✅ updateChallengeDisplayLegacy 函数已添加');
    console.log('   ✅ claimChallengeReward 函数已修复');
    console.log('   ✅ init 函数已修复');
    
    if (dailyChallenges && dailyChallenges.length > 0) {
        console.log('   ✅ 挑战数据已加载:', dailyChallenges.length, '个挑战');
        dailyChallenges.forEach(challenge => {
            console.log(`      - ${challenge.title}: ${challenge.progress}/${challenge.target} (${challenge.completed ? '已完成' : '进行中'})`);
        });
    } else {
        console.log('   ⚠️ 挑战数据未初始化');
    }
    
    console.log('=== 挑战系统修复完成 ===');
}

// 执行修复
setTimeout(() => {
    try {
        fixClaimRewards();
        fixInitFunction();
        showFixStatus();
        
        // 立即更新一次显示
        if (dailyChallenges && dailyChallenges.length > 0) {
            updateChallengeDisplayLegacy();
        }
        
        console.log('🎉 所有修复已完成！挑战系统应该可以正常工作了。');
    } catch (error) {
        console.error('❌ 修复过程中出现错误:', error);
    }
}, 1000);