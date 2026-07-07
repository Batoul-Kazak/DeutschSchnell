import { NightsStay, WbSunny } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeProvider';
// import { FaMoon, FaSun } from "react-icons/fa6"

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme} className="px-2 text-white">
            {theme === "light" ?
                <NightsStay sx={{ fontSize: 28 }} />
                :
                <WbSunny sx={{ fontSize: 28 }} />
            }
        </button>
    )
}
