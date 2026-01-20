import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/index.jsx';

function App() {
    //return <MainLayout />;
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/main" element={<div>🥎 Main CMP 🥎</div>} />
                    <Route path="/forbidden" element={<div>🥎 Forbidden 🥎</div>} />
                    <Route path="/add-question" element={<div>🥎 Add Question 🥎</div>} />
                    <Route path="/question/:id" element={<div>🥎 Question Page 🥎</div>} />

                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
