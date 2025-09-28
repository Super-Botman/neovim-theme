const filesElement = document.getElementById('files');
const existingContent = filesElement.innerHTML;

export default function FilesWrapper() {
  return (
    <SimpleBar forceVisible="x" scrollbarMaxSize={0}>
      <div dangerouslySetInnerHTML={{ __html: existingContent }} />
    </SimpleBar>
  );
}
