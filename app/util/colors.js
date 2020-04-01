import { isDev, withWindow } from "~/util"

export function hexToRGB(hex, alpha = 1) {
  if (!hex) {
    return ""
  }

  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function generateRGBColorVarsFromHexVars() {
  const rgbColorVarsStyleTagID = "rgb-color-vars"

  withWindow(() => {
    if (document.getElementById(rgbColorVarsStyleTagID)) {
      return
    }

    const stylesheets = Array.from(document.styleSheets)
    const rgbVars = []

    stylesheets.forEach(stylesheet => {
      try {
        Array.from(stylesheet.cssRules).forEach(rule => {
          if (rule.selectorText === ":root") {
            Array.from(rule.style).forEach(variable => {
              const variableValue = rule.style.getPropertyValue(variable).trim()
              if (
                variable.startsWith("--color") &&
                /^#[0-9A-F]{6}$/i.test(variableValue)
              ) {
                const r = Number.parseInt(variableValue.slice(1, 3), 16)
                const g = Number.parseInt(variableValue.slice(3, 5), 16)
                const b = Number.parseInt(variableValue.slice(5, 7), 16)

                rgbVars.push(`${variable}-rgb: ${r}, ${g}, ${b}`)
              }
            })
          }
        })
      } catch (error) {
        if (isDev()) {
          console.groupCollapsed("⚠️ [Warning]: Error accessing stylesheet")
          console.warn(`Could not access stylesheet: ${stylesheet.href}`, error)
          console.groupEnd()
        }
      }
    })

    if (rgbVars.length > 0) {
      const stylesheet = document.createElement("style")
      stylesheet.type = "text/css"
      stylesheet.id = rgbColorVarsStyleTagID
      stylesheet.textContent = `:root {\n\t${rgbVars.join(";\n\t")};\n}`
      document.head.appendChild(stylesheet)
    }
  })
}
