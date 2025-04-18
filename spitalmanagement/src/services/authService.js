// Mock user data - Replace with actual API calls
const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", password: "12345678", role: "admin", phone: "+1234567890", address: "123 Main St", dateOfBirth: "1990-01-01" },
    { id: 2, name: "Dr. Smith", email: "smith@example.com", password: "12345678", role: "doctor" },
    { id: 3, name: "Jane Patient", email: "jane@example.com", password: "12345678", role: "patient" },
];

export const login = async (email, password) => {
    // Mock login - Replace with actual API call
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
        // Don't send password to localStorage
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return userWithoutPassword;
    }
    throw new Error('Invalid email or password');
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
    return !!getCurrentUser();
}; 