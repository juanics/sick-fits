export default function formatMoney (amount = 0) {
  const formatter = Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD',
     minimumFractionDigits: amount % 100 === 0 ? 2 : 0,
  })

  return formatter.format(amount/100);
}
