const GoogleButton = () => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-50"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
};

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.19c0-.74-.07-1.45-.19-2.13H12v4.03h5.24a4.48 4.48 0 0 1-1.94 2.94v2.61h3.14c1.84-1.69 2.91-4.18 2.91-7.45Z"
      />
      <path
        fill="#34A853"
        d="M12 21.7c2.62 0 4.82-.87 6.43-2.36l-3.14-2.61c-.87.58-1.98.93-3.29.93-2.53 0-4.67-1.71-5.44-4.01H3.31v2.69A9.7 9.7 0 0 0 12 21.7Z"
      />
      <path
        fill="#FBBC05"
        d="M6.56 13.65A5.8 5.8 0 0 1 6.26 12c0-.57.1-1.13.3-1.65V7.66H3.31A9.7 9.7 0 0 0 2.3 12c0 1.56.37 3.04 1.01 4.34l3.25-2.69Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.34c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.81 3.42 14.62 2.3 12 2.3a9.7 9.7 0 0 0-8.69 5.36l3.25 2.69C7.33 8.05 9.47 6.34 12 6.34Z"
      />
    </svg>
  );
}

export default GoogleButton;
