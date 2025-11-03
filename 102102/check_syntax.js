const fs = require('fs');
const content = fs.readFileSync('/Users/xiahouyi/102102/摸鱼金币.html', 'utf8');

// 提取script标签内容
const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
if (scriptMatch) {
  const scriptContent = scriptMatch[scriptMatch.length-1];
  const lines = scriptContent.split('\n');
  
  console.log('查找HTML标签在JS代码中...');
  
  // 检查每一行是否包含HTML标签
  for (let i = 0; i < Math.min(50, lines.length); i++) {
    const line = lines[i];
    if (line.includes('<') && line.includes('>') && !line.includes('//') && !line.includes('/*')) {
      console.log(`行${i}: 发现HTML标签`);
      console.log(`内容: ${JSON.stringify(line)}`);
    }
  }
  
  // 检查特定错误行
  const errorLine = 12;
  console.log(`\n错误行 ${errorLine} 详细检查:`);
  console.log(`内容: ${JSON.stringify(lines[errorLine])}`);
  
  // 检查是否有多余的script标签
  console.log('\n检查script标签完整性...');
  const scriptCloseMatches = scriptContent.match(/<\/script>/gi);
  console.log(`找到的script结束标签数量: ${scriptCloseMatches ? scriptCloseMatches.length : 0}`);
  
  // 尝试找到具体的语法错误
  console.log('\n尝试编译script内容...');
  try {
    new Function(scriptContent);
    console.log('✅ 语法检查通过');
  } catch (error) {
    console.log('❌ 语法错误:', error.message);
    console.log('错误堆栈:', error.stack);
  }
}