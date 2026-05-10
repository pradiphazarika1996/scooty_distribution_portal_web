interface IPageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<IPageHeaderProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div>
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
