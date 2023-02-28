dentro do .huskyrc:
{
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "npm run test:ci"
  }
}
