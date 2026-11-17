// Custom markdown-it plugin for ++keyboard++ syntax
export function keyboardShortcutsPlugin(md) {
  // Add a new rule for parsing ++text++ syntax
  md.inline.ruler.after('emphasis', 'keyboard_shortcuts', function(state, silent) {
    const start = state.pos
    
    // Check if we have ++
    if (start + 1 >= state.src.length || 
        state.src.charCodeAt(start) !== 0x2B /* + */ || 
        state.src.charCodeAt(start + 1) !== 0x2B) {
      return false
    }
    
    // Find closing ++
    let end = start + 2
    while (end < state.src.length) {
      if (state.src.charCodeAt(end) === 0x2B && 
          end + 1 < state.src.length && 
          state.src.charCodeAt(end + 1) === 0x2B) {
        break
      }
      end++
    }
    
    // Check if we found closing ++
    if (end >= state.src.length || 
        end + 1 >= state.src.length || 
        state.src.charCodeAt(end) !== 0x2B || 
        state.src.charCodeAt(end + 1) !== 0x2B) {
      return false
    }
    
    // Extract content between ++
    const content = state.src.slice(start + 2, end).trim()
    
    if (silent) {
      return true
    }
    
    // Create token
    const token = state.push('kbd_open', 'kbd', 1)
    
    // Add content as text token
    const textToken = state.push('text', '', 0)
    textToken.content = content
    
    state.push('kbd_close', 'kbd', -1)
    
    // Update position
    state.pos = end + 2
    
    return true
  })
  
  // Add render rules for kbd tags
  md.renderer.rules.kbd_open = (tokens, idx) => {
    return '<kbd>'
  }
  
  md.renderer.rules.kbd_close = () => {
    return '</kbd>'
  }
}