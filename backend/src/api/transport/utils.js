export const calcDistance = (lat1, lng1, lat2, lng2) => {
  return Math.sqrt((lat1 - lat2) ** 2 + (lng1 - lng2) ** 2)
}

export const genRandomPointInCircle = (center, radius) => {
  center = { lat: Number.parseFloat(center.lat), lng: Number.parseFloat(center.lng) }
  const angle = Math.random() * 2 * Math.PI
  const distance = Math.random() * radius
  const lng = center.lng + distance * Math.cos(angle)
  const lat = center.lat + distance * Math.sin(angle)
  
  return { lat, lng };
}