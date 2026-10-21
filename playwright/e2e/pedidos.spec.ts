import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
 //Arrange
  await page.goto('http://localhost:5173/');  
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  //Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-M4KHHV')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  //Assert 

  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedido$/ })
    .locator('..') //pega o elemento pai do elemento que contém o texto 'Pedido'

  await expect(containerPedido).toContainText('VLO-M4KHHV', { timeout: 10_000 }) //verifica se o elemento contém o texto 'VLO-M4KHHV'

  await expect(page.getByText('APROVADO')).toBeVisible() //verifica se o elemento contém o texto 'APROVADO'
})