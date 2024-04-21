import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useWindowWidth from "../../utils/useWindowSize.jsx";
import { DISPLAY_SETTINGS } from "../../utils/constants.js";

function useMoviesDisplaySettings(filteredMovies) {
  const location = useLocation();
  const width = useWindowWidth();
  const [displayedCount, setDisplayedCount] = useState(0);

  const setting = useMemo(() => {
    if (width > DISPLAY_SETTINGS.medium.max) {
      return DISPLAY_SETTINGS.large;
    } else if (width > DISPLAY_SETTINGS.small.max) {
      return DISPLAY_SETTINGS.medium;
    } else {
      return DISPLAY_SETTINGS.small;
    }
  }, [width]); // setting будет пересоздан только при изменении width

  useEffect(() => {
    if (location.pathname === "/movies") {
      setDisplayedCount(Math.min(setting.initial, filteredMovies.length));
    }
  }, [location, filteredMovies.length, setting.initial]);

  const handleShowMore = () => {
    if (location.pathname === "/movies") {
      setDisplayedCount((prevCount) =>
        Math.min(prevCount + setting.increment, filteredMovies.length)
      );
    }
  };

  // Вычисляем массив отображаемых карточек
  const displayedMovies = filteredMovies.slice(0, displayedCount);

  return {
    displayedMovies,
    handleShowMore,
  };
}

export default useMoviesDisplaySettings;
