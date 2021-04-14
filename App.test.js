// it can be changed to import if add config with babel
require('@testing-library/jest-dom/extend-expect')

const { render, fireEvent } = require('@testing-library/svelte')

const App = require('./App.svelte')

test('shows proper heading when rendered', () => {
  const { getByText } = render(App) // , { name: 'World' }

  expect(getByText('Learn Svelte')).toBeInTheDocument()
})

// Note: This is as an async test as we are using `fireEvent`
test('have a link text on click', async () => {
  const { getByText } = render(App) // , { name: 'World' }
  const button = getByText('Learn Svelte')

  // Using await when firing events is unique to the svelte testing library because
  // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
  await fireEvent.click(button)

  expect(button).toHaveTextContent('Learn Svelte')
})
