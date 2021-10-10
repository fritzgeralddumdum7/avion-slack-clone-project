import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';

it ("Renders correctly", () => {
    const {queryByTestId, queryByPlaceholderText} = render(<Login />)
    expect(queryByTestId("submit-btn")).toBeTruthy()
    expect(queryByPlaceholderText('Password', 'name@work-email.com')).toBeTruthy()
})

describe("Input value", () => {
    it("updates on change", () => {
        const {queryByPlaceholderText} = render(<Login />)

        const logInput = queryByPlaceholderText('Password', 'name@work-email.com');

        fireEvent.change(logInput, {target: {value: "test"}})

        expect(logInput.value).toBe("test")
    })
})

describe("Submit with Data", () => {
    it("triggers requestLogin", () => {
        const requestLogin = jest.fn();

        const {queryByTestId, queryByPlaceholderText} = render(<Login requestLogin={requestLogin} />)
        const logInput = queryByPlaceholderText('Password', 'name@work-email.com');
        fireEvent.change(logInput, {target: {value: "test"}})
        
        fireEvent.click(queryByTestId('submit-btn'))
        expect(requestLogin, logInput).toHaveBeenCalled();
    })
  })

describe("Submit Button", () => {
    describe ("empty query", () => {
        it("does not trigger", () => {
        const requestLogin = jest.fn();
            const {queryByTestId} = render(<Login requestLogin={requestLogin} />)

            fireEvent.click(queryByTestId('submit-btn'))
            expect(requestLogin).not.toHaveBeenCalled()
        })
    })
})
