import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export function starRating(rating: number) {
  if (rating === 0) {
    return <span className="text-gray-500 text-sm">No reviews yet</span>;
  }

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-500" />);
    }
  }

  return <div className="flex">{stars}</div>;
}
