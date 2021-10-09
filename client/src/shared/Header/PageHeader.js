import './PageHeader.scoped.css';

function PageHeader ({ title, buttonLabel, handleButtonClick, hasButton=true }) {
    return(
        <header>
            <h3>{title}</h3>
            { hasButton &&
                <button onClick={handleButtonClick}> {buttonLabel}</button>
            }
        </header>
    )
}

export default PageHeader;
