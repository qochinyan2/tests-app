// import { render, screen, waitFor } from '@testing-library/react';
// import Dashboard from '../dashboard/page'; // Adjusted import path for Dashboard component

// (global.fetch as jest.Mock) = jest.fn();

// describe('Dashboard', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders loading state initially', () => {

//     fetch.mockResolvedValueOnce(new Promise(() => {}));

//     render(<Dashboard />);

//     expect(screen.getByText(/loading/i)).toBeInTheDocument();
//   });

//   it('renders error state when fetch fails', async () => {

//     fetch.mockRejectedValueOnce(new Error('Network Error'));

//     render(<Dashboard />);

//     await waitFor(() => expect(screen.getByText(/error occurred/i)).toBeInTheDocument());
//   });

//   it('renders content state when data is fetched successfully', async () => {

//     const mockData = {
//       title: 'Test Title',
//       description: 'Test description content.',
//     };

//     fetch.mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockData,
//     });

//     render(<Dashboard />);

//     await waitFor(() => expect(screen.getByText(mockData.title)).toBeInTheDocument());
//     expect(screen.getByText(mockData.description)).toBeInTheDocument();
//   });
// });
