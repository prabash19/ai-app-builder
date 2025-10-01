export default function IframePage(url: any) {
  return (
    <iframe
      src={url} // replace with your url
      title="External Site"
      style={{
        position: "fixed", // forces it to pin to viewport
        width: "100vw",
        height: "100vh",
        border: "none",
      }}
      allowFullScreen
    ></iframe>
  );
}
