// urlChecker.js - URL检查工具（如果需要修改）
export default function urlChecker(url) {
  if (!url) return false;

  // 检查URL是否为绝对URL（以http://或https://开头）
  return /^(https?:)?\/\//i.test(url);
}
