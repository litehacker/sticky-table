# Sticky Table Component

A React component that provides a horizontally scrollable table with dynamic sticky column functionality. Users can select which columns to keep visible while scrolling horizontally through large datasets.

## Features

- ✅ **Horizontal Scrolling**: Handles wide tables that exceed viewport width
- ✅ **Dynamic Sticky Columns**: Toggle any column to remain sticky while scrolling
- ✅ **Visual Indicators**: Clear indication of which columns are currently sticky
- ✅ **Responsive Design**: Works across different screen sizes
- ✅ **TypeScript Support**: Fully typed for better development experience
- ✅ **Accessible**: Proper ARIA labels and keyboard navigation support

## Installation

This component uses shadcn/ui components. Make sure you have the following dependencies installed:

```bash
npm install @radix-ui/react-checkbox
npm install lucide-react
```

And ensure you have these shadcn/ui components:

```bash
npx shadcn@latest add checkbox
npx shadcn@latest add card
```

## Usage

### Basic Implementation

```tsx
import StickyTable from './components/sticky-table'

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
    // ... more fields
  },
  // ... more rows
]

const columns = [
  { key: "id", label: "ID", width: "80px" },
  { key: "name", label: "Name", width: "150px" },
  { key: "email", label: "Email", width: "200px" },
  // ... more columns
]

function App() {
  return <StickyTable data={data} columns={columns} />
}
```

### Advanced Usage with Custom Props

```tsx
<StickyTable 
  data={employeeData}
  columns={columnDefinitions}
  defaultStickyColumns={["id", "name"]}
  maxHeight="600px"
  onColumnToggle={(columnKey, isSticky) => {
    console.log(`Column \${columnKey} is now \${isSticky ? 'sticky' : 'not sticky'}`)
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<Record<string, any>>` | Required | Array of data objects to display |
| `columns` | `ColumnDefinition[]` | Required | Column configuration array |
| `defaultStickyColumns` | `string[]` | `["id"]` | Initially sticky columns |
| `maxHeight` | `string` | `"auto"` | Maximum height of table container |
| `onColumnToggle` | `(key: string, isSticky: boolean) => void` | `undefined` | Callback when column stickiness changes |
| `className` | `string` | `""` | Additional CSS classes |

## Column Definition

```tsx
interface ColumnDefinition {
  key: string        // Unique identifier for the column
  label: string      // Display name for the column header
  width: string      // CSS width value (e.g., "150px", "10%")
  sortable?: boolean // Whether column is sortable (future feature)
  type?: 'text' | 'number' | 'date' | 'currency' // Data type (future feature)
}
```

## Customization

### Styling

The component uses Tailwind CSS classes. You can customize the appearance by:

1. **Override CSS classes**: Pass custom `className` prop
2. **Modify theme**: Update your Tailwind config
3. **Custom sticky styles**: Modify the `getStickyStyle` function

```tsx
// Custom styling example
<StickyTable 
  className="custom-table-theme"
  data={data}
  columns={columns}
/>
```

```css
/* Custom CSS */
.custom-table-theme .sticky-column {
  background-color: #f8fafc;
  border-right: 3px solid #3b82f6;
}
```

### Data Formatting

Format your data before passing to the component:

```tsx
const formattedData = rawData.map(item => ({
  ...item,
  salary: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(item.salary),
  startDate: new Date(item.startDate).toLocaleDateString()
}))
```

## Performance Considerations

### Large Datasets

For tables with 1000+ rows, consider:

1. **Virtual Scrolling**: Implement virtual scrolling for better performance
2. **Pagination**: Break data into smaller chunks
3. **Lazy Loading**: Load data as needed

```tsx
// Example with pagination
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 100
const paginatedData = data.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
)

<StickyTable data={paginatedData} columns={columns} />
```

### Memory Optimization

```tsx
// Memoize expensive calculations
const memoizedColumns = useMemo(() => 
  columns.map(col => ({ ...col, width: calculateOptimalWidth(col) })),
  [data]
)
```

## Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

**Note**: Sticky positioning requires modern browser support. Fallback behavior shows normal scrolling without sticky columns.

## Accessibility

The component follows WCAG 2.1 guidelines:

- **Keyboard Navigation**: Full keyboard support for checkboxes and scrolling
- **Screen Readers**: Proper ARIA labels and live regions
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Meets AA standards

### ARIA Labels

```tsx
// The component automatically adds appropriate ARIA labels
<th aria-sort="none" role="columnheader">
  Column Name
</th>
<td role="gridcell">Cell Content</td>
```

## Common Use Cases

### 1. Employee Management Dashboard
```tsx
const employeeColumns = [
  { key: "id", label: "Employee ID", width: "120px" },
  { key: "name", label: "Full Name", width: "200px" },
  { key: "department", label: "Department", width: "150px" },
  { key: "salary", label: "Salary", width: "120px" },
  // ... more columns
]
```

### 2. Financial Data Table
```tsx
const financialColumns = [
  { key: "date", label: "Date", width: "120px" },
  { key: "account", label: "Account", width: "200px" },
  { key: "debit", label: "Debit", width: "120px" },
  { key: "credit", label: "Credit", width: "120px" },
  // ... more columns
]
```

### 3. Product Inventory
```tsx
const inventoryColumns = [
  { key: "sku", label: "SKU", width: "120px" },
  { key: "name", label: "Product Name", width: "250px" },
  { key: "category", label: "Category", width: "150px" },
  { key: "stock", label: "Stock Level", width: "120px" },
  // ... more columns
]
```

## Troubleshooting

### Common Issues

**1. Horizontal scroll not appearing**
- Ensure container has fixed width or max-width
- Check that total column width exceeds container width
- Verify `overflow-x: auto` is applied

**2. Sticky columns not working**
- Check browser support for `position: sticky`
- Ensure parent container doesn't have `overflow: hidden`
- Verify z-index values are correct

**3. Performance issues**
- Implement virtual scrolling for large datasets
- Use `React.memo` for row components
- Consider pagination for 500+ rows

### Debug Mode

Enable debug mode to see column calculations:

```tsx
<StickyTable 
  data={data}
  columns={columns}
  debug={true} // Shows column width calculations
/>
```

## Future Enhancements

### Planned Features

- [ ] **Column Sorting**: Click headers to sort data
- [ ] **Column Resizing**: Drag column borders to resize
- [ ] **Column Reordering**: Drag and drop to reorder columns
- [ ] **Row Selection**: Checkbox selection for rows
- [ ] **Export Functionality**: Export to CSV/Excel
- [ ] **Search/Filter**: Built-in search and filtering
- [ ] **Virtual Scrolling**: Handle 10k+ rows efficiently
- [ ] **Column Groups**: Group related columns together

### API Extensions

```tsx
// Future API design
<StickyTable 
  data={data}
  columns={columns}
  features={{
    sorting: true,
    filtering: true,
    selection: 'multiple',
    export: ['csv', 'excel'],
    virtualScrolling: { threshold: 1000 }
  }}
  onSort={(column, direction) => {}}
  onFilter={(filters) => {}}
  onSelect={(selectedRows) => {}}
  onExport={(format, data) => {}}
/>
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

### Development Setup

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## License

MIT License - see LICENSE file for details.

## Author

**Giorgi Gvimradze**
- LinkedIn: [https://www.linkedin.com/in/litehacker/](https://www.linkedin.com/in/litehacker/)
## Support

- 📧 Email: support@yourproject.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourproject/issues)
- 📖 Documentation: [Full Documentation](https://docs.yourproject.com)
- 💬 Discord: [Community Chat](https://discord.gg/yourproject)
