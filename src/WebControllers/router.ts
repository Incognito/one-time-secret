export function getRouter(
  publishSecretUri: string,
  fetchController: Function,
  confirmationController: Function,
  authorController: Function
) {
  return new Map([
    ['GET', new Map([
      ['/fetch', fetchController],
      [publishSecretUri, authorController]
    ])],
    ['POST', new Map([
      [publishSecretUri, confirmationController]
    ])]
  ]);
}
