export function getRouter(publishSecretUri, fetchController, publishController, authorController) {
  return Map([
    ['GET', new Map([
      ['/fetch', fetchController],
      [publishSecretUri, authorController]
    ])],
    ['POST', new Map([
      [publishSecretUri, publishController]
    ])]
  ]);
}
