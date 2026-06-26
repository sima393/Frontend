# React Product Management Frontend

A modern React application for managing products with a clean and intuitive UI built with Vite and Tailwind CSS.

## Features

- ✅ View all products
- ✅ Create new products
- ✅ Edit product details
- ✅ Delete products
- ✅ Real-time product list updates
- ✅ Responsive design
- ✅ Fast development with Vite

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Running backend API on `http://localhost:3000`

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Frontend.git
   cd Frontend
   ```

2. **Navigate to the Client folder**
   ```bash
   cd Client
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Application

### Development Mode (with hot reload)
```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another available port)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Configuration

The frontend is configured to connect to the backend API at:
```
http://localhost:3000/api/products
```

Make sure your backend is running on port 3000 before starting the frontend.

## Project Structure

```
Client/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx      # Main product listing page
│   │   └── CreatePage.jsx    # Product creation page
│   ├── App.jsx         # Root component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Features in Detail

### HomePage
- Displays all products from the API
- Show product name, quantity, price, and image
- Edit button to update product details
- Delete button to remove products
- Add new product form

### Product Management
- **Create**: Add new products with name, quantity, price, and image URL
- **Read**: View all products in a responsive grid
- **Update**: Edit product information via modal/prompt
- **Delete**: Remove products with confirmation

## Technologies Used

- **React**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code quality tool
- **Fetch API**: HTTP client for API calls

## API Integration

The frontend communicates with the backend API:

```javascript
const API_URL = 'http://localhost:3000/api/products';

// Get all products
fetch(API_URL)

// Create product
fetch(API_URL, { method: 'POST', body: ... })

// Update product
fetch(`${API_URL}/:id`, { method: 'PUT', body: ... })

// Delete product
fetch(`${API_URL}/:id`, { method: 'DELETE' })
```

## Development Workflow

1. Start the backend: `npm run dev` in the backend directory
2. Start the frontend: `npm run dev` in the Client directory
3. Open `http://localhost:5173` in your browser
4. Make changes and see them update instantly with hot reload

## Troubleshooting

**"Could not connect to the backend API server"**
- Ensure the backend is running on `http://localhost:3000`
- Check that CORS is enabled in the backend
- Verify the API URL in the frontend configuration

**Port already in use**
- Change the port in `vite.config.js` or use `npm run dev -- --port 3001`

## Contributing

Feel free to fork and submit pull requests.

## License

ISC
