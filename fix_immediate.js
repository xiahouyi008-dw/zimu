// 🚀 立即修复 - 无需打开挑战面板
console.log('🔄 立即修复挑战进度显示问题...');

// ✅ 重写updateChallengeProgress函数，确保每次都更新硬编码元素
const originalUpdateChallengeProgress = window.updateChallengeProgress;

window.updateChallengeProgress = function(type, value = 1) {
    console.log('🔄 [修复版] 更新挑战进度 - 类型:', type, '值:', value);
    
    let updated = false;
    let completedChallenge = null;
    
    if (window.dailyChallenges) {
        window.dailyChallenges.forEach(challenge => {
            if (challenge.type === type && !challenge.completed) {
                console.log('📊 找到匹配挑战:', challenge.title, '当前进度:', challenge.progress);
                
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
                
                if (challenge.progress >= challenge.target) {
                    challenge.completed = true;
                    completedChallenge = challenge;
                    console.log('�� 挑战完成:', challenge.title);
                }
                
                updated = true;
            }
        });
        
        if (updated) {
            console.log('💾 保存挑战进度到本地存储');
            localStorage.setItem('dailyChallenges', JSON.stringify(window.dailyChallenges));
            
            // ✅ 关键：立即更新硬编码元素，不管面板是否显示
            updateHardcodedChallengeElements();
            
            // 更新统计面板
            if (typeof updateDisplay === 'function') {
                updateDisplay();
            }
            
            // 如果有挑战完成，显示通知
            if (completedChallenge) {
                setTimeout(() => {
                    if (typeof playAchievementSound === 'function') {
                        playAchievementSound();
                    }
                    if (typeof showNotification === 'function') {
                        showNotification(`🎉 挑战完成: ${completedChallenge.title}! 点击领取奖励`, 'achievement');
                    }
                }, 500);
            }
        }
    }
    
    return updated;
};

// ✅ 确保updateHardcodedChallengeElements函数存在并正确工作
if (typeof window.updateHardcodedChallengeElements !== 'function') {
    window.updateHardcodedChallengeElements = function() {
        console.log('🔄 更新硬编码挑战元素...');
        
        if (window.dailyChallenges) {
            window.dailyChallenges.forEach((challenge, index) => {
                const challengeNum = index + 1;
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
        }
        
        console.log('✅ 硬编码挑战元素更新完成');
    };
}

// ✅ 立即更新当前挑战状态
if (window.dailyChallenges) {
    console.log('📋 当前挑战状态:', window.dailyChallenges.map(c => ({
        title: c.title,
        progress: c.progress,
        target: c.target,
        completed: c.completed
    })));
    
    updateHardcodedChallengeElements();
}

console.log('🎉 立即修复完成！现在点击金币查看实时更新效果');
console.log('💡 提示：不需要打开挑战面板，进度会直接显示在按钮上');
