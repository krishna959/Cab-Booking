function Header() {
  return (
    <div className="flex justify-between items-center p-4 shadow">
      <h1 className="font-bold text-xl">Cab Booking</h1>

      <div className="flex gap-4 items-center">
        <button className="text-xl">☰</button>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default Header;
