function NotificationToast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-black text-white p-3">
      {message}
    </div>
  );
}

export default NotificationToast;
