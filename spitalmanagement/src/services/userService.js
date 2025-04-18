// Mock user data - Replace with actual API calls
const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Dr. Smith", email: "smith@example.com", role: "doctor" },
    { id: 3, name: "Jane Patient", email: "jane@example.com", role: "patient" },
];

export const getAllUsers = () => {
    return mockUsers;
};

export const updateUserRole = async (userId, newRole) => {
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        mockUsers[userIndex] = {
            ...mockUsers[userIndex],
            role: newRole
        };
        return mockUsers[userIndex];
    }
    throw new Error('User not found');
};

export const getUserById = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}; 