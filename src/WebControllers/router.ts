export function getRouter(publishSecretUri: string, fetchController: Function, publishController: Function, authorController: Function) {
  return new Map([
    ['GET', new Map([
      ['/fetch', fetchController],
      [publishSecretUri, authorController]
    ])],
    ['POST', new Map([
      [publishSecretUri, publishController]
    ])]
  ]);
}
