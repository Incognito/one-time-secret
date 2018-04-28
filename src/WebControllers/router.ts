export function getRouter(publishSecretUri, fetchController, publishController, authorController) {
  export const router = Map([
    ['GET', new Map([
      ['/fetch', fetchController]
      ['/publishSecretUri', authorController]
    ])]
    ['POST' new Map([
      ['/publishSecretUri', publishController]
    ])]
  ])
}
