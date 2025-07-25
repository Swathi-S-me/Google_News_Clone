import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/routes'; 
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();
export default function App() {
  return  <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
}
