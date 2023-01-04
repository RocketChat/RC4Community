enable-git-hooks:
		git config core.hooksPath .githooks
		chmod +x .githooks/pre-commit
		chmod +x .githooks/commit-msg
		$(warning REMEMBER, YOU MUST HAVE REVIEWED THE CUSTOM HOOKS!)