import sys

def replace_all(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # 1. Update .hero-name-highlight
    content = content.replace(
        ".hero-name-highlight {\n  color: var(--accent-primary);\n}",
        ".hero-name-highlight {\n  background: linear-gradient(135deg, var(--accent-primary), var(--accent-success));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}"
    )

    # 2. Update .btn-primary
    content = content.replace(
        ".btn-primary {\n  background: var(--accent-primary);\n  color: #ffffff;\n  border: 1px solid var(--accent-primary);\n  box-shadow: 0 2px 6px rgba(27, 102, 201, 0.2);\n}\n\n.btn-primary:hover {\n  background: var(--accent-primary-hover);\n  border-color: var(--accent-primary-hover);\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(27, 102, 201, 0.3);\n  color: #ffffff;\n}",
        ".btn-primary {\n  background: linear-gradient(135deg, var(--accent-primary), #0e4c9e);\n  color: #ffffff;\n  border: none;\n  box-shadow: 0 4px 14px rgba(27, 102, 201, 0.25);\n}\n\n.btn-primary:hover {\n  background: linear-gradient(135deg, var(--accent-primary-hover), #0a3a7a);\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(27, 102, 201, 0.4);\n  color: #ffffff;\n}"
    )

    # 3. Update .section-eyebrow
    content = content.replace(
        ".section-eyebrow {\n  display: inline-block;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  color: var(--accent-primary);\n  margin-bottom: 10px;\n  font-family: 'JetBrains Mono', monospace;\n  padding: 4px 12px;\n  background: var(--accent-tint);\n  border-radius: var(--radius-pill);\n  border: 1px solid rgba(27, 102, 201, 0.15);\n}",
        ".section-eyebrow {\n  display: inline-block;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  background: linear-gradient(135deg, var(--accent-primary), var(--accent-success));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  margin-bottom: 10px;\n  font-family: 'JetBrains Mono', monospace;\n  padding: 4px 12px;\n  border-radius: var(--radius-pill);\n  border: 1px solid rgba(27, 102, 201, 0.2);\n}"
    )

    # 4. Update .info-card:hover and .project-card:hover
    content = content.replace(
        ".info-card:hover {\n  border-color: var(--border-hover);\n  box-shadow: var(--shadow-card-hover);\n  transform: translateY(-3px);\n}",
        ".info-card:hover {\n  border-color: var(--accent-primary);\n  box-shadow: 0 10px 30px -5px rgba(27, 102, 201, 0.15);\n  transform: translateY(-4px);\n}\n[data-theme='dark'] .info-card:hover {\n  box-shadow: 0 10px 30px -5px rgba(59, 130, 246, 0.25);\n}"
    )
    content = content.replace(
        ".project-card:hover {\n  border-color: var(--border-hover);\n  box-shadow: var(--shadow-card-hover);\n  transform: translateY(-4px);\n}",
        ".project-card:hover {\n  border-color: var(--accent-primary);\n  box-shadow: 0 10px 30px -5px rgba(27, 102, 201, 0.15);\n  transform: translateY(-4px);\n}\n[data-theme='dark'] .project-card:hover {\n  box-shadow: 0 10px 30px -5px rgba(59, 130, 246, 0.25);\n}"
    )

    # 5. Update .avatar-ring
    content = content.replace(
        ".avatar-ring {\n  width: 190px;\n  height: 190px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--accent-primary), var(--accent-success));\n  padding: 4px;\n  margin: 0 auto 20px;\n  box-shadow: 0 4px 16px rgba(27, 102, 201, 0.18);\n  transition: var(--transition);\n}",
        "@keyframes glowPulse {\n  0% { box-shadow: 0 0 10px rgba(27, 102, 201, 0.2); }\n  50% { box-shadow: 0 0 25px rgba(27, 102, 201, 0.5); }\n  100% { box-shadow: 0 0 10px rgba(27, 102, 201, 0.2); }\n}\n\n.avatar-ring {\n  width: 190px;\n  height: 190px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--accent-primary), var(--accent-success));\n  padding: 4px;\n  margin: 0 auto 20px;\n  animation: glowPulse 3s infinite;\n  transition: var(--transition);\n}"
    )

    with open(file_path, 'w') as f:
        f.write(content)

replace_all("/home/sissay/Projects/sissaywube.github.io/styles.css")
