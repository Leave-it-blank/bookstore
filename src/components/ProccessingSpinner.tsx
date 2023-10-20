export default function Spin({ color, loading, classes }: { color: string, loading: boolean, classes?: string }) {
    if (color == "") {
        color = "neutral";
    }
    if (!loading) {
        return;
    }

    return (<>
        <span className={`animate-spin rounded-full border-t-4  border-${color}-800 border-solid h-6 w-6 mx-4 ${classes} `} />
    </>)
}