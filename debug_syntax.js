const fs = require('fs');
const content = fs.readFileSync('/Users/xiahouyi/102102/摸鱼金币.html', 'utf8');

// 找到script标签并提取内容
const scriptStart = content.indexOf('<script>', 2850);
const scriptEnd = content.lastIndexOf('</script>');

if (scriptStart !== -1 && scriptEnd !== -1) {
  const scriptContent = content.substring(scriptStart + 8, scriptEnd);
  
  console.log('Script内容长度:', scriptContent.length);
  console.log('开始位置:', scriptStart);
  console.log('结束位置:', scriptEnd);
  
  // 检查语法错误
  try {
    new Function(scriptContent);
    console.log('✅ 语法检查通过');
  } catch (error) {
    console.log('❌ 语法错误:', error.message);
    
    // 分析错误位置
    const errorMatch = error.stack.match(/:(\d+):(\d+)/);
    if (errorMatch) {
      const errorLine = parseInt(errorMatch[1]);
      console.log('错误行号:', errorLine);
      
      const lines = scriptContent.split('\n');
      console.log('\n错误上下文:');
      for (let i = Math.max(0, errorLine - 2); i <= Math.min(lines.length - 1, errorLine + 2); i++) {
        console.log(`${i + 1}: ${JSON.stringify(lines[i])}`);
      }
    }
  }
} else {
  console.log('未找到script标签');
}