import React from 'react';
const SvgMock = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
    (props, ref) => <svg ref={ref} {...props} />
);
export default SvgMock;