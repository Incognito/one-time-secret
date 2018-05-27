import { render as baseView } from './BaseView';

// todo make this work by reference
export function render(secretUrl: string): string {
  const view = `
    <h2>Confirmation</h2>
    <p>Once this link is visited, the content will no longer be available.</p>
    <p>After the expiry time is reached, the content  will no longer be available.</p>
    <h3>
${secretUrl}
    </h3>
  `.trim();
  return baseView(view);
}
