import { render as baseView } from './BaseView';

// todo make into reference
// todo make promise so we can remove template
// todo protect against HTML tag injection
export function render(secret: string): string {
  const view = `
  <pre>${secret}</pre>
  `.trim();
  return baseView(view);
}
