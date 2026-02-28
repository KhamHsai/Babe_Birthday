export default function Layout({ children }) {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; background: #000; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0805; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.4); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.7); }
      `}</style>
      {children}
    </div>
  );
}