import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	// server: {
	// 	proxy: {
	// 		'/logginStatus': {
	// 			target: 'http://localhost:3000/',
	// 			changeOrigin: true,
	// 			// rewrite: (path) => path.replace(/^\/api/, ''),
	// 		},
	// 	},
	// },
	server: {
		host: "0.0.0.0", // Bind to all network interfaces
		port: 5173, // Optional, specify the port
		strictPort: true, // Ensures Vite doesn't switch ports
		hmr: {
			clientPort: 5173, // Ensures HMR works on network devices
		},
	},
})
