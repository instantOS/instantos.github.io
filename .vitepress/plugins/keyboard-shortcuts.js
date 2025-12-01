// Custom markdown-it plugin for ++keyboard++ syntax
export function keyboardShortcutsPlugin(md) {
  // Pattern to match ++content++ (but not inside code blocks)
  const pattern = /(?<!`)\+\+([^+\n]+?)\+\+(?!`)/g
  
  // Replace ++text++ with <kbd>text</kbd>
  md.renderer.rules.text = (tokens, idx) => {
    const content = tokens[idx].content
    return content.replace(pattern, '<kbd>$1</kbd>')
  }
  
  // Also process inline content
  md.renderer.rules.inline = (tokens, idx, options, env, renderer) => {
    const result = renderer.renderToken(tokens, idx, options)
    return result.replace(/(?<!`)\+\+([^+\n]+?)\+\+(?!`)/g, '<kbd>$1</kbd>')
  }
}